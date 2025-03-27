import { DateTime, Duration, Interval } from "luxon";
import Action from "#models/action";
import Database from "#database/database"
import Model from "#database/model";
import Ledger from "#database/ledger";
import Record, { RecordType } from "#models/record";
import Tags from "#core/tags";


const loadedEpisodes = new Map();

const database = new Database();

export default class Episode extends Model {
  name = "New Episode"
  date = DateTime.now()
  scheduledTime = Interval.after(DateTime.now(), Duration.fromObject({hours: 5}))
  tags = new Tags()

  actions = []
  communities = []
  phases = []
  players = []
  resources = []
  societies = []


  //TODO: Put these in a separate file?
  records = []

  //Helper functions
  #addTo(key) {
    return (object) => {
      object.setEpisode(this);
      this[key].push(object);
    }
  }

  #getById(key) {
    return (id) => this[key].find( element => element.id === id );
  }

  addAction = this.#addTo("actions")
  addCommunity = this.#addTo("communities")
  addPhase = this.#addTo("phases")
  addPlayer = this.#addTo("players")
  addResource = this.#addTo("resources")
  addSociety = this.#addTo("societies")
  addRecord = record => {
    console.log( record.toLog() );
    this.#addTo("records")(record);
  }
  
  getActionById = this.#getById("actions")
  getCommunityById = this.#getById("communities")
  getPhaseById = this.#getById("phases")
  getPlayerById = this.#getById("players")
  getResourceById = this.#getById("resources")
  getSocietyById = this.#getById("societies")
  getRecordById = this.#getById("records")

  get activePhases() {
    return this.phases.filter((phase) => !phase.isComplete)
  }

  get currentPhase() {
    return this.phases.find( phase => !phase.isComplete );
  }


  save() {
    const filename = database.getFilename({ type: "episodes", id: this.id});
    database.save(filename, this);
    Ledger.updateEpisode(this);
  }

  rereferenceModels() {
    [ this.actions, this.communities, this.phases, this.players, this.records, this.resources, this.societies ].forEach( 
      collection => collection.forEach(
        model => model?.setEpisode?.(this)
      )
    )
  }

  startRound( roundNumber ) {
    const actionsLastRound = this.actions.filter( action => action.round == roundNumber - 1);

    //every exhausted resource becomes unexhausted
    const exhaustedResources = this.resources.filter( resource => resource.isExhausted );
    exhaustedResources.forEach( resource => resource.unexhaust() );

    //every resource in actions becomes exhausted
    const usedResources = actionsLastRound.map( action => action.resourceIds.map( this.getResourceById ) ).flat();
    usedResources.forEach( resource => resource.exhaust() );

    //every zero-resource community is now endangered
    this.communities.forEach( community => community.startRound(roundNumber) )

    const endangeredCommunities = this.communities.filter( community => community.isEndangered );
    this.addRecord( new Record({ type: RecordType.EPISODE_COMMUNITIES_ENDANGERED, description: endangeredCommunities.map( x => x.name ).join(), value: endangeredCommunities.length }))

    //per society actions
    this.societies.forEach( society => society.startRound(roundNumber) );

    this.save();
  }

  completeRound( roundNumber ) {
    this.societies.forEach( society => society.completeRound(roundNumber) );
    this.save();
  }


  getCurrentActionsForSocietyId( societyId ) {
    return this.actions
      .filter( action => action.round == this.currentPhase.round )
      .filter( action => action.societyId == societyId )
  }


  beginCrisisMode() {
    this.tags.add(EpisodeTags.CRISIS_MODE);
  }

  endCrisisMode() {
    this.tags.delete(EpisodeTags.CRISIS_MODE);
  }

  makeActive() {
    this.tags.add(EpisodeTags.ACTIVE);
  }

  isActive() {
    return this.tags.has(EpisodeTags.ACTIVE);
  }

  static load(id) {
    if (loadedEpisodes.has(id)) {
      return loadedEpisodes.get(id);
    }

    const filename = database.getFilename({ type: "episodes", id });
    const episode = database.load(filename);
    episode.rereferenceModels();

    loadedEpisodes.set(id, episode);
    return episode;
  };


    toURL(append = "") {
    return `/episodes/${this.id}` + append;
  }

}


export const EpisodeTags = {
  ACTIVE: "active",
  COMPLETE: "complete",
  CRISIS_MODE: "crisis-mode"
};