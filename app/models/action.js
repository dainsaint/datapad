import Tags from "#core/tags";
import EpisodeModel from "#database/episode-model"


export default class Action extends EpisodeModel {
  tags = new Tags() 
  
  resources = [];
  
  societyId
  emissary
  round
  
  roll = []

  constructor({ societyId } = {}) {
    super();
    Object.assign(this, {societyId});
  }

  setResources( resources ) {
    this.resources = resources;
  }

  removeResources( resources ) {
    for( const resource of resources ) {
      const index = this.resources.indexOf(resource);
      if( index >= 0 )
        this.resources.splice(index, 1);
    }
  }

  get primaryResource () {
    if( !Array.isArray(this.resources) )
      this.resources = [];

    return this.resources.at(0);
  }

  toURL(append = "") {
    return `/episodes/${this.episodeId}/actions/${this.id}` + append;
  }

};

export const ActionResultTags = {
  SUCCESS: "success",
  MIXED_SUCCESS: "mixed_success",
  CRITICAL_SUCCESS: "critical_success",
  FAILURE: "failure",
  MIXED_FAILURE: "mixed_failure",
  CRITICAL_FAILURE: "critical_failure",
  ADVANTAGE: "advantage",
  DISADVANTAGE: "disadvantage"
}