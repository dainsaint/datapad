import { DateTime, Duration, Interval } from "luxon";
import Action from "#models/action";
import Database from "#database/database"
import Model from "#database/model";
import Ledger from "#database/ledger";
import Record, { RecordType } from "#models/record";


const loadedEpisodes = new Map();
const database = new Database();

export default class Episode extends Model {
  name = "New Episode"
  date = DateTime.now()
  scheduledTime = Interval.after(DateTime.now(), Duration.fromObject({hours: 5}))

  actions = []
  communities = []
  phases = []
  players = []
  records = []
  resources = []
  societies = []

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
  addRecord = this.#addTo("records")
  
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



  turnoverRound() {
    //every exhausted resource becomes unexhausted
    const exhaustedResources = this.resources.filter( resource => resource.isExhausted );
    exhaustedResources.forEach( resource => resource.unexhaust() );

    //every resource in actions becomes exhausted
    const usedResources = this.actions.map( action => action.resourceIds.map( this.getResourceById ) ).flat();
    usedResources.forEach( resource => resource.exhaust() );

    //every zero-resource community is now endangered
    this.communities.forEach( community => {
      if( this.resources.some( resource => resource.communityId == community.id ) )
        community.unendanger();
      else
        community.endanger();
    })

    //wipe and record actions
    this.actions.forEach( action => this.addRecord( new Record({ 
      type: RecordType.ACTION_RESOURCES, 
      description: `${this.getSocietyById(action.societyId).name} used ${ action.resources.map( resource => resource.name ).join() } to take action.`,
      value: action.resources.length
    })))

    this.actions = [];

    //init actions — two per society
    this.societies.forEach( society => {
      for( let i = 0; i < 2; i++ ) {
        const action = new Action({ societyId: society.id, round: this.currentPhase.round });
        this.addAction(action);
      }
    })

    this.save();
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