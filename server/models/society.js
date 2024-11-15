import Model from "./model.js";

export default class Society extends Model {
  name = "";
  players = [];

  constructor(name) {
    super();
    this.name = name;
  }
}
