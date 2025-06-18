import uuid from "#core/uuid";
import { rateLimit } from "#core/utils";
import Serializer from "#database/serializer";

export default class Storage {
  id
  _root = "data"
  _diskWriteDelay = 2000

  constructor({ root = "data", diskWriteDelay = 2000 } = {}) {
    this.id = uuid(8);
    this._root = root;
    this._diskWriteDelay = diskWriteDelay;
  }

  async _save(filename, data) {}
  async _load(filename) { return "" }

  #parse(text) {
    return Serializer.deserialize(text);
  }

  #rateLimitedSave = rateLimit(this._save, this._diskWriteDelay);

  async save(filename, data) {
    this.#rateLimitedSave(filename, data);
  }

  async load(filename) {
    const text = await this._load(filename);
    try {
      const json = this.#parse(text);
      return json;
    } catch(e) {
      console.log(e);
      return null;
    }
  }

  getFilename({ id, type }) {
    return `${type.toLowerCase()}/${id}.json`;
  }
}