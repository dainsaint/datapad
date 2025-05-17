import Tags from "#core/tags";
import Model from "#database/model";
import Record, { RecordType } from "#models/record";
import Action from "#models/action";


export default class Society extends Model {
  name
  archetype
  color

  tags = new Tags()

  constructor(data) {
    super(data);
    this.update(data);
  }

  startRound( roundNumber ) {
    const actionThisRound = this.episode.actions
      .filter( action => action.round == roundNumber )
      .find( action => action.societyId == this.id )

    if( !actionThisRound ) {
      const action = new Action({ societyId: this.id, round: roundNumber });
      this.episode.addAction(action);
    }
  }

  completeRound( roundNumber ) {
    //count actions taken this round
    const actionsTakenThisRound = this.episode.actions
      .filter( action => action.round == roundNumber )
      .filter( action => action.societyId == this.id )
      .filter( action => action.resourceIds.length > 0 ) //TODO: swap this with READY tag

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

  get resources() {
    return this.communities.map( community => community.resources ).flat();
  }


  toURL(append = "") {
    return `/episodes/${this.episode.id}/societies/${this.id}` + append;
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
  RIVER_STONE: "color-river-stone",
  COMMON_GROUND: "color-common-ground",
  CANARY_DIAMOND: "color-canary-diamond",
  RED_SUN_RISING: "color-red-sun-rising",
  HUCKLEBERRY: "color-huckleberry",
  STRAWBERRY_QUARTZ: "color-strawberry-quartz",
  VIOLET_STRANDS: "color-violet-strands"
};


export const SocietyTags = {
  INSPIRED: "inspired"
}