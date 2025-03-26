import Tags from "#core/tags";
import EpisodeModel from "#database/episode-model"

export default class Resource extends EpisodeModel {
  name = "";
  relationship = "";
  tags = new Tags();

  communityId;

  constructor({ name = "New Resource" }) {
    super();
    Object.assign(this, {name});
  }

  exhaust() {
    this.tags.add( ResourceTag.EXHAUSTED );
  }

  unexhaust() {
    this.tags.delete( ResourceTag.EXHAUSTED );
  }

  get isExhausted() {
    return this.tags.has( ResourceTag.EXHAUSTED );
  }

  get isVital() {
    return this.tags.has( ResourceTag.VITAL );
  }

  toURL(append = "") {
    return `/episodes/${this.episodeId}/resources/${this.id}` + append;
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