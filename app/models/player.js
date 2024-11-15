import Model from "../core/model.js";

export default class Player extends Model {
  name = "";

  constructor(name) {
    super();
    this.name = name;
  }
}
