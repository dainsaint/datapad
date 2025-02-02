import Tags from "#core/tags";
import { EpisodeModel } from "#models/episode";

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
  USING: "using",
  EXHAUSTED: "exhausted",
  VITAL: "vital",
  TRANSFORMED: "transformed",
  DESTROYED: "destroyed",
  SEIZED: "seized",
}; 
