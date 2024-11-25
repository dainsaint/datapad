import crypto from "node:crypto";

const codex = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";

const generateId = (length) => {
  return new Array(length).fill(0).map((_, i) => codex[crypto.randomInt(i == 0 ? 52 : 64)]).join("");
}

export default class Model {
  _id = ""; 
  _type = "Model";

  constructor() {
    this._id = generateId(8);
    this._type = this.constructor.name;
  }

  toReference(...keys) {
    const result = {_id: this._id };
    for (const key of keys) {
      result[key] = this[key];
    }

    return result;
  }
}