import Tags from "#core/tags"
import EpisodeModel from "#database/episode-model"

export default class Player extends EpisodeModel {
  name = "New Player";
  pronouns = "they/them";
  tags = new Tags();

  societyId;

  constructor({ name = "New Player"} ){
    super();
    Object.assign(this, {name})
  }

  toURL(append = "") {
    return `/episodes/${this.episodeId}/phases/${this.id}` + append;
  }

}

export const PlayerTags = {

}