import fs from "fs";
import path from "node:path";
import Serializer from "./serializer.js";
import { rateLimit } from "./utils.js";

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
      fs.writeFileSync(fullPath, Serializer.serialize(data));
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
    return Serializer.deserialize(text);
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

  getFilename({ id, type }) {
    return `${type.toLowerCase()}/${id}.json`;
  }

}  