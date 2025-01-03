import Tags from "../core/tags.js";
import EpisodeModel from "./episode-model.js";

export default class Resource extends EpisodeModel {
  name = "";
  relationship = "";
  tags = new Tags();

  constructor({ name = "New Resource" }) {
    super();
    Object.assign(this, {name});
  }

  get isExhausted() {
    return this.tags.has( ResourceTag.EXHAUSTED );
  }

  toURL(append = "") {
    return `/episodes/${this.episode}/resources/${this.id}` + append;
  }
}

export const ResourceTag = {
  EXHAUSTED: "exhausted",
  VITAL: "vital",
  TRANSFORMED: "transformed",
  DESTROYED: "destroyed",
  SEIZED: "seized",
}; 
