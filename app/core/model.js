import { nanoid } from "nanoid";

export default class Model {
  _id = "";
  _type = "Model";

  constructor() {
    this._id = nanoid(8);
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