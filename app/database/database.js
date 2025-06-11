import "dotenv/config";
import LocalStorage from "#database/storage/local-storage";
import RemoteStorage from "#database/storage/remote-storage";

export default class Database {

  storage

  constructor({ location } = {}) {
    location ??= process.env.DATABASE_LOCATION || DatabaseLocation.LOCAL;
    
    this.storage = location == DatabaseLocation.LOCAL 
      ? new LocalStorage() 
      : new RemoteStorage();
  }

  async save(filename, data) {
    await this.storage.save(filename, data);
  }

  async load(filename) {
    return await this.storage.load(filename)
  }

  getFilename({ id, type }) {
    return this.storage.getFilename({ id, type });
  }
}


export const DatabaseLocation = {
  LOCAL: "local",
  REMOTE: "remote"
}