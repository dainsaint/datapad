import fs from "fs";
import path from "node:path";
import moment from "moment";

import { rateLimit } from "./utils.js";

import Tags from "./tags.js";

const Types = {};
const references = new Map();

export default class Datastore  {

  root = "data"
  diskWriteDelay = 2000

  constructor({ root = "data", diskWriteDelay = 2000 } = {}) {
    this.root = root;
    this.diskWriteDelay = diskWriteDelay;
  }

  #save(filename, data) {
    const fullPath = path.join(this.root, filename);
    
    try {
      //ensure subdir exists
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    } catch (e) {
      //subdir already exists
    }

    try {
      //save file
      fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  #load(filename) {
    const fullPath = path.join(this.root, filename);
    const file = fs.readFileSync(fullPath);
    return file.toString();
  }

  #parse(text) {
    return JSON.parse(text, (key, value) => {
      //TODO: Figure out how to rehydrate dates...
      // if (moment(value, moment.ISO_8601, true).isValid())
      //   return new Date(value);

      //TODO: This is a very weird way to rehydrate this, but it should work for now
      if( key === "tags" ) return new Tags(value);

      if (typeof value !== "object") return value;

      if ("type" in value) {
        if (references.has(value.id)) return references.get(value.id);

        const Type = Types[value.type];
        if (!Type) {
          console.log( "Warning: Couldn't hydrate", value.type, "(has it been added to Types in datastore.js?");
          return value;
        }

        const reference = Object.assign( new Type(value), value );
        references.set(value.id, reference);
        return reference;
      }

      return value;
    });
  }

  #rateLimitedSave = rateLimit(this.#save, this.diskWriteDelay);

  save(filename, data) {
    this.#rateLimitedSave(filename, data);
  }

  load(filename) {
    const text = this.#load(filename);
    const json = this.#parse(text);
    return json;
  }

  has(filename) {
    const fullPath = path.join(this.root, filename);
    return fs.existsSync(fullPath);
  }

  getModelFilename({ id, type }) {
    return `${type.toLowerCase()}/${id}.json`;
  }

  static registerTypes(...types) {
    types.forEach( type => {
      Types[ type.name ] = type;
    })
  }

}