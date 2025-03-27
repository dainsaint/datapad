import Tags from "#core/tags";
import Model from "#database/model";

export default class Action extends Model {
  societyId
  resourceIds = []
  round
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

  removeResources( resources ) {
    for( const resource of resources ) {
      const index = this.resourceIds.indexOf(resource.id);
      if( index >= 0 )
        this.resourceIds.splice(index, 1);
    }
  }

  get primaryResource () {
    let resourceId = this.resourceIds.at(0);
    return this.episode.getResourceById(resourceId);
  }

  get resources() {
    return this.resourceIds.map(this.episode.getResourceById);
  }

  get society() {
    return this.episode.getSocietyById( this.societyId );
  }

  toURL(append = "") {
    return `/episodes/${this.episode.id}/actions/${this.id}` + append;
  }
}


export const ActionTags = {
  READY: "ready",

  SUCCESS: "success",
  MIXED_SUCCESS: "mixed_success",
  CRITICAL_SUCCESS: "critical_success",
  FAILURE: "failure",
  MIXED_FAILURE: "mixed_failure",
  CRITICAL_FAILURE: "critical_failure",
  ADVANTAGE: "advantage",
  DISADVANTAGE: "disadvantage"
}