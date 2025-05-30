import Tags from "#core/tags";
import Model from "#database/model";

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
  
  toURL(append = "") {
    return `/turns/${this.episode.id}/${this.societyId}/${this.round}` + append;
  }
}