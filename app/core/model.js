import crypto from "node:crypto";

export default class Model {
  _id = ""
  _type = "Model"

  constructor() {
    this._id = crypto.randomUUID();
    this._type = this.constructor.name;
  }
}