import Tags from "#core/tags";
import { oxfordize } from "#core/utils";
import Model from "#database/model";
import { DateTime } from "luxon";

export default class Action extends Model {
  round
  
  societyId
  resourceIds = []
  texts = []
  
  risk = 1
  advantage = 0
  disadvantage = 0
  result = []

  voteTime
  status = ActionStatus.OPEN
  tags = new Tags()




  constructor(data) {
    super(data);
    this.update(data);
  }

  setResources( resources ) {
    this.resourceIds = resources
      .filter( resource => !resource.isExhausted )
      .map( resource => resource.id );
  }

  vote() {
    this.status = ActionStatus.VOTED;
    this.voteTime = DateTime.now();
  }

  invalidate() {
    this.status = ActionStatus.INVALID;
  }

  get primaryResource () {
    let resourceId = this.resourceIds.at(0);
    return this.episode.getResourceById(resourceId);
  }

  get resources() {
    return this.resourceIds.map( id => this.episode.getResourceById(id) );
  }

  get society() {
    return this.episode.getSocietyById( this.societyId );
  }

  toURL(append = "") {
    return `/actions/${this.episode.id}/${this.id}` + append;
  }
}


export const ActionStatus = {
  OPEN: "open",
  VOTED: "voted",
  INVALID: "invalid"
}



export const ActionTags = {
  SUCCESS: "success",
  MIXED_SUCCESS: "mixed_success",
  CRITICAL_SUCCESS: "critical_success",
  FAILURE: "failure",
  MIXED_FAILURE: "mixed_failure",
  CRITICAL_FAILURE: "critical_failure"
}