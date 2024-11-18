import Model from "../core/model.js";
import Community from "./community.js";

export default class Player extends Model {
  
  name = "New Player";
  pronouns = ["they", "them"];
  community;

  constructor(name) {
    super();
    this.name = name;
    this.community = new Community();
  }
}
