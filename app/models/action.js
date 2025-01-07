import Tags from "#core/tags";
import { EpisodeModel } from "#models/episode";


export default class Action extends EpisodeModel {
  tags = new Tags() 
  
  resources = {
    primary: undefined,
    additional: []
  }
  
  society
  emissary
  round
  
  roll = []

  constructor({ society } = {}) {
    super();
    Object.assign(this, {society});
  }

  setPrimaryResource(resource) {
    this.resources.primary = resource;
  }

  setAdditionalResources( resources ) {
    this.resources.additional = resources;
  }

  toURL(append = "") {
    return `/episodes/${this.episode}/actions/${this.id}` + append;
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