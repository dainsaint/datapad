import uuid from "./uuid.js";

export default class Model {
  id

  constructor() {
    this.id = uuid(8)
  }

  update( patch ) {
    Object.assign(this, patch);
  }
}