import Model from "./model.js";

export default class Player extends Model {
  name = "";

  constructor(name) {
    super();
    this.name = name;
  }
}
