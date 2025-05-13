import fs from "fs";
import path from "node:path";
import Serializer from "./serializer.js";
import { rateLimit } from "../core/utils.js";

import uuid from "#core/uuid";

import Offshore from "#database/offshore";

const offshore = new Offshore();

export default class Database {
  id
  #root = "data"
  #diskWriteDelay = 2000
  #offshoreDelay = 300000
  useOffshore = false;

  constructor({ root = "data", diskWriteDelay = 2000, offshoreDelay = 300000, useOffshore = false } = {}) {
    this.id = uuid(8);
    this.#root = root;
    this.#diskWriteDelay = diskWriteDelay;
    this.#offshoreDelay = offshoreDelay;
    this.useOffshore = useOffshore;
  }
  

  getById( key, id ) {
    return this[key].find( x => x.id === id );
  }

  addModel( key, model ) {
    this[key] ||= [];
    this[key].push( model );
    model.registerDatabase(this);
  }


  #save(filename, data) {
    const fullPath = path.join(this.#root, filename);
    
    try {
      //ensure subdir exists
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    } catch (e) {
      //subdir already exists
    }

    try {
      //save file
      fs.writeFileSync(fullPath, Serializer.serialize(data));
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  #load(filename) {
    const fullPath = path.join(this.#root, filename);
    const file = fs.readFileSync(fullPath);
    return file.toString();
  }

  #parse(text) {
    return Serializer.deserialize(text);
  }

  #offshore(filename, data) {    
    try {
      //save file
      offshore.saveJSONToPath(filename, data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  #rateLimitedSave = rateLimit(this.#save, this.#diskWriteDelay);
  #rateLimitedOffshore = rateLimit(this.#offshore, this.#offshoreDelay);

  save(filename, data) {
    this.#rateLimitedSave(filename, data);
    if( this.useOffshore )
      this.#rateLimitedOffshore(filename, data);
  }

  load(filename) {
    const text = this.#load(filename);
    
    const json = this.#parse(text);
    return json;
  }

  has(filename) {
    const fullPath = path.join(this.#root, filename);
    return fs.existsSync(fullPath);
  }

  getFilename({ id, type }) {
    return `${type.toLowerCase()}/${id}.json`;
  }
}
