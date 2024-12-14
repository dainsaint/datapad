import Tags from "../core/tags.js";
import SessionModel from "./session-model.js";

export default class Player extends SessionModel {

  name = "New Player"
  pronouns = ["they", "them"] 
  community
  tags = new Tags()

  constructor({ name = "New Player"} ){
    super();
    this.name = name;
  }

  toURL(append = "") {
    return `/sessions/${this.session}/phases/${this.id}` + append;
  }

}

export const PlayerTags = {

}