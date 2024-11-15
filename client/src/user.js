import crypto from "node:crypto";

export default class User {
  _id;

  constructor() {
    this._id = crypto.randomUUID();
  }
}
