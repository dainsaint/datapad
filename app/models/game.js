import Model from "./model.js";
import Tags from "../core/tags.js";

export default class Game extends Model {

  name = "New Game"
  tags = new Tags() 
  episodes = []

  constructor({ name = "New Game" }) {
    super();
    Object.assign(this, {name});
  }

  addEpisode({id, name, date}) {
    this.episodes.push({id, name, date})
  }

  toURL(append = "") {
    return `/games/${this.id}` + append;
  }

};

export const GameTags = {

}