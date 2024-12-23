import Model from "../core/model.js";
import Tags from "../core/tags.js";

export default class Game extends Model {

  name = "New Game"
  tags = new Tags() 
  sessions = []

  constructor({ name = "New Game" }) {
    super();
    Object.assign(this, {name});
  }

  addSession({id, name, date}) {
    this.sessions.push({id, name, date})
  }

  toURL(append = "") {
    return `/games/${this.id}` + append;
  }

};

export const GameTags = {

}