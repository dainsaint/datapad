import Model from "../core/model.js";

export default class Community extends Model {
  name = "New Community";
  resources = [];
  voice = "people"

  constructor({name, voice = "people"}) {
    super();
    this.name = name;
    this.voice = voice;
  }

  get isEndangered() {
    return this.resources.length == 0;
  }
}