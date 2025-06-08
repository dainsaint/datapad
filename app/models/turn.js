import Model from "#database/model";
import { ActionStatus } from "#models/action";
import { CommunityVoice } from "#models/community";

export default class Turn extends Model {

  round
  societyId

  risk = 1
  advantage = 0
  disadvantage = 0

  emissaryCommunityId  

  ambassadors = {}

  alterLeadership = {}

  constructor({round, societyId}) {
    super({round, societyId});
    this.update({round, societyId});
  }

  validateLeadership() {
    this.society.activeCommunities.forEach( community => this.alterLeadership[community.id] ??= community.voice )
    this.episode.save();
  }

  isAmbassador( communityId ) {
    return this.ambassadors[communityId]
  }

  sendAmbassador( communityId, societyId ) {
    this.ambassadors[communityId] = societyId;
  }

  getAmbassadorSociety( communityId ) {
    return this.episode.societies.find( society => society.id == this.ambassadors[communityId] );
  }


  get society() {
    return this.episode.societies.find( society => society.id == this.societyId );
  }

  get action() {
    const actions = this.episode.getActionsByRound( this.societyId, this.round );
    return actions.find( action => action.status == ActionStatus.VOTED);
  }
  
  toURL(append = "") {
    return `/turns/${this.episode.id}/${this.societyId}/${this.round}` + append;
  }
}

export const TurnOverrideVoice = {
  NONE: "None",
  LEADER: CommunityVoice.LEADER,
  PEOPLE: CommunityVoice.PEOPLE
} 