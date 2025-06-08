export default class Storage {
  id
  _root = "data"
  _diskWriteDelay = 2000

  constructor({ root = "data", diskWriteDelay = 2000 } = {}) {
    this._root = root;
    this._diskWriteDelay = diskWriteDelay;
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

  #parse(text) {
    return Serializer.deserialize(text);
  }

  #rateLimitedSave = rateLimit(this._save, this._diskWriteDelay);

  async save(filename, data) {
    this.#rateLimitedSave(filename, data);
  }

  async load(filename) {
    const text = await this._load(filename);
    const json = this.#parse(text);
    return json;
  }

  getFilename({ id, type }) {
    return `${type.toLowerCase()}/${id}.json`;
  }
}