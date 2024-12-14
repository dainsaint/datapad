import uuid from "./uuid.js";

export default class Model {
  id
  type

  constructor() {
    this.id = uuid(8),
    this.type = this.constructor.name;
  }

  update( patch ) {
    Object.assign(this, patch);
  }
}