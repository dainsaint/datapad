import Tags from "#core/tags"
import { EpisodeModel } from "#modules/episodes/model"

export default class Player extends EpisodeModel {

  name = "New Player"
  pronouns = ["they", "them"] 
  community
  tags = new Tags()

  constructor({ name = "New Player"} ){
    super();
    Object.assign(this, {name})
  }

  toURL(append = "") {
    return `/episodes/${this.episode}/phases/${this.id}` + append;
  }

}

export const PlayerTags = {

}