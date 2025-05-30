import { DateTime, Duration, Interval } from "luxon";
import Database from "#database/database"
import Model from "#database/model";
import Ledger from "#database/ledger";
import Record, { RecordType } from "#models/record";
import Tags from "#core/tags";
import { PhaseType } from "#models/phase";
import Document from "#models/document";
import Turn from "#models/turn";


const loadedEpisodes = new Map();

const database = new Database({useOffshore: true});

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
  turns = []

  documentIds = []

  links = {
    discord: "discord://-/channels/1063250197993492480/1063254140341473350",
  }

  //TODO: Put these in a separate file?
  records = []

  //Helper functions
  #addTo(key) {
    return (object) => {
      object.setEpisode(this);
      this[key].push(object);
      return object;
    }
  }

  #getById(key) {
    return (id) => this[key].find( element => element.id === id );
  }

  #deleteById(key) {
    return (id) => this[key].splice( this[key].findIndex( element => element.id === id ), 1 );
  }



  addAction = this.#addTo("actions")
  addCommunity = this.#addTo("communities")
  addPhase = this.#addTo("phases")
  addPlayer = this.#addTo("players")
  addResource = this.#addTo("resources")
  addSociety = this.#addTo("societies")
  addTurn = this.#addTo("turns");

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
  getTurnById = this.#getById("turn")


  deleteActionById = this.#deleteById("actions")
  deleteCommunityById = this.#deleteById("communities")
  deletePhaseById = this.#deleteById("phases")
  deletePlayerById = this.#deleteById("players")
  deleteResourceById = this.#deleteById("resources")
  deleteSocietyById = this.#deleteById("societies")
  deleteRecordById = this.#deleteById("records")


  deleteDocumentById(id) {
    this.documentIds = this.documentIds.filter( dId => dId != id );
    
  }


  get activePhases() {
    return this.phases.filter((phase) => !phase.isComplete)
  }

  get currentPhase() {
    return this.phases.find( phase => !phase.isComplete );
  }

  get currentRound() {
    return this.currentPhase.round;
  }

  get documents() {
    return this.documentIds.map( id => Document.load(id) );
  }

  get activeCommunities() {
    return this.communities.filter( community => community.isActive );
  }

  get activeResources() {
    return this.resources.filter( resource => resource.isActive );
  }


  save() {
    this.sanitizePhases();
    const filename = database.getFilename({ type: "episodes", id: this.id});
    database.save(filename, this);
    Ledger.updateEpisode(this);
  }

  rereferenceModels() {
    [ this.actions, this.communities, this.phases, this.players, this.records, this.resources, this.societies, this.turns ].forEach( 
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
    if( endangeredCommunities.length > 0 ) {
      this.addRecord( new Record({ type: RecordType.EPISODE_COMMUNITIES_ENDANGERED, description: this.name + ": " + endangeredCommunities.map( x => x.name ).join(), value: endangeredCommunities.length }))
    }

    //per society actions
    this.societies.forEach( society => society.startRound(roundNumber) );

    this.save();
  }

  completeRound( roundNumber ) {
    this.societies.forEach( society => society.completeRound(roundNumber) );
    this.save();
  }


  getCurrentActionsForSocietyId( societyId ) {
    return this.getActionsByRound(societyId, this.currentPhase.round);
  }

  getActionsByRound( societyId, round )  {
    return this.actions
      .filter( action => action.round == round )
      .filter( action => action.societyId == societyId )
  }


  getTurnByRound( societyId, round ) {
    round = parseInt(round);
    let turn = this.turns.find( turn => turn.round == round && turn.societyId == societyId );
    
    
    if(!turn) {
      turn = new Turn({ round, societyId });
      this.addTurn( turn );
    }
    
    return turn;
  }

  getCurrentTurnForSocietyId( societyId ) {
    
    return this.getTurnByRound( societyId, this.currentRound );
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



  getPhaseGroups() {
    let round = 0;
    const groups = this.phases.reduce( (result, phase ) => {
      const isRound = [ PhaseType.UNIVERSAL, PhaseType.SOCIETAL, PhaseType.GALACTIC ].includes( phase.type );
      const startsNewGroup = [ PhaseType.UNIVERSAL, PhaseType.BLANK, PhaseType.BREAK, PhaseType.CONCLUSION, PhaseType.SETUP, PhaseType.INDIVIDUAL,  PhaseType.GENERATIONAL ].includes( phase.type );
  
      if( result.length == 0 || startsNewGroup ) {
        if( isRound ) round++;
  
        result.push({
          isRound,
          round,
          phases: []
        })
  
        
      }
      
      result.at(-1).phases.push(phase);
      return result;
    }, [])

    return groups;
  }

  sanitizePhases() {
    const groups = this.getPhaseGroups();
    let round = 0;
    for( const group of groups ) {
      for( const phase of group.phases ) {
        if( phase.type == PhaseType.UNIVERSAL )
          round++;

        phase.round = round;
      }
    }
  }
}


export const EpisodeTags = {
  ACTIVE: "active",
  COMPLETE: "complete"
};