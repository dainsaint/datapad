import Tags from "#core/tags";
import Model from "#database/model";
import Record, { RecordType } from "#models/record";
import { ActionStatus } from "#models/action";
import societies from "#data/societies" with {type: 'json'};


export default class Society extends Model {
  // name
  archetype
  fateId
  color = SocietyColor.RIVER_STONE

  tags = new Tags()

  roundData = []

  constructor(data) {
    super(data);
    this.update(data);
  }

  getRoundData(round) {
    let data = this.roundData.find( data => data.round == round )
    if(!data) {
      data = new SocietyRound({ round, societyId: this.id });
      this.roundData.push(data);
      this.roundData.sort( (a, b) => a.round - b.round );
    }

    return data;
  }





  startRound( roundNumber ) {
    // const actionThisRound = this.episode.actions
    //   .filter( action => action.round == roundNumber )
    //   .find( action => action.societyId == this.id )

    // if( !actionThisRound ) {
    //   const action = new Action({ societyId: this.id, round: roundNumber });
    //   this.episode.addAction(action);
    // }
  }

  completeRound( roundNumber ) {
    //count actions taken this round
    const actionsTakenThisRound = this.episode.actions
      .filter( action => action.round == roundNumber )
      .filter( action => action.societyId == this.id )
      .filter( action => action.status == ActionStatus.VOTED )

    this.episode.addRecord( new Record({ type: RecordType.SOCIETY_ACTIONS_TAKEN, description: this.name, value: actionsTakenThisRound.length }));

    actionsTakenThisRound.forEach( action => this.episode.addRecord( new Record({ 
      type: RecordType.ACTION_RESOURCES, 
      description: `${this.name} used ${ action.resources.map( resource => resource.name ).join() } to take action.`,
      value: action.resources.length
    })))
  }

  get communities() {
    return this.episode.communities.filter( community => community.societyId == this.id );
  }

  get activeCommunities() {
    return this.communities.filter( community => community.isActive );
  }

  get resources() {
    return this.communities.map( community => community.resources ).flat();
  }

  get activeResources() {
    return this.activeCommunities.map( community => community.activeResources ).flat();
  }

  get name() {
    return this.archetype;
  }

  get currentEmissary() {
    const id = this.currentTurn.emissaryCommunityId
    return this.episode.getCommunityById(id);
  }

  get currentTurn() {
    return this.episode.getCurrentTurnForSocietyId( this.id );
  }


  get players() {
    return this.communities.map( community => community.player );
  }

  get fate() {
    return societies[this.archetype]?.fates[ this.fateId ] || "No Fate Selected";
  }


  toURL(append = "") {
    return `/societies/${this.episode?.id}/${this.id}` + append;
  }

  static getFateForArchetype( archetype, fateId ) {
    return societies[archetype]?.fates[ fateId ] || "None";
  }
}


export class SocietyRound {

  round
  societyId

  emissaryCommunityId
  leadershipOverrides = {}
  
  ambassadorsSent = []

  constructor({round, societyId}) {
    this.round = round
    this.societyId = societyId
  }

  addAmbassador( communityId, societyId ) {
    this.ambassadorsSent.push( {communityId, societyId} );
  }


}


export const SocietyArchetype = {
  AESTHETIC: "the aesthetic",
  CURIOUS: "the curious",
  ENTERPRISE: "the enterprise",
  FAITHFUL: "the faithful",
  GROUNDED: "the grounded",
  INTREPID: "the intrepid",
  MIGHTY: "the mighty",
  SCHOLARS: "the scholars",
};


export const SocietyColor = {
  LIGHT_BLUE: "color-light-blue",
  RIVER_STONE: "color-river-stone",
  COMMON_GROUND: "color-common-ground",
  CANARY_DIAMOND: "color-canary-diamond",
  RED_SUN_RISING: "color-red-sun-rising",
  DEEP_ORANGE: "color-deep-orange",
  HUCKLEBERRY: "color-huckleberry",
  STRAWBERRY_QUARTZ: "color-strawberry-quartz",
  VIOLET_STRANDS: "color-violet-strands",
  DEEP_PURPLE: "color-deep-purple"
};


export const SocietyFate = {
  NONE: "",
  FATE_ONE: "fate_one",
  FATE_TWO: "fate_two",
  FATE_THREE: "fate_three"
}

export const SocietyTags = {
  INSPIRED: "inspired"
}