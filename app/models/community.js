import Model from "../core/model.js";

export default class Community extends Model {
  name = "New Community";
  resources = [];

  constructor(name) {
    super();
    this.name = name;
  }

  get isEndangered() {
    return this.resources.length == 0;
  }
}