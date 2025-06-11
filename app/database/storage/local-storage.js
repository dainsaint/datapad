import fs from "fs";
import path from "node:path";
import Serializer from "#database/serializer";
import Storage from "#database/storage/storage";


export default class LocalStorage extends Storage{

  constructor({ root = "data", diskWriteDelay = 2000 } = {}) {
    super({ root, diskWriteDelay });
  }

  async _save(filename, data) {
    const fullPath = path.join(this._root, filename);
    
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

  async _load(filename) {
    const fullPath = path.join(this._root, filename);
    const file = fs.readFileSync(fullPath);
    return file.toString();
  }

}