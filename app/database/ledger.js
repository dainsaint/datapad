import Database from "#database/database";

const database = new Database();
const filename = "ledger.json";

/*
- [ ] Index players?
- [ ] Cleanup references to episodes that no longer exist (on start?)
*/

class LedgerSingleton {
  episodes = [];
  active;

  initialize() {
    try {
      const fromDisk = database.load(filename);
      Object.assign(this, fromDisk);
    } catch (e) {
      if (e.code !== "ENOENT") {
        //ENONENT means file doesnt exist, thats fine
        //(we'll create automatically on next save)
        //any other error, we should see
        console.log(e);
      }
    }
  }

  //PRIVATE METHODS
  #save() {
    database.save(filename, this);
  }

  #updateRecord(key, record) {
    if (!record) return;

    const oldRecord = this[key].find((r) => r.id === record.id);
    if (oldRecord) {
      Object.assign(oldRecord, record);
    } else {
      this[key].push(record);
    }
  }

  #getEpisodeRecord(episode) {
    return {
      id: episode.id,
      name: episode.name,
      date: episode.date,
    };
  }

  setActiveEpisode( episode ) {
    this.active = episode
    this.#save();
  }

  getActiveEpisode() {
    //TODO: Fix this doofer
    return this.active
  }

  //TODO: Make sure each game has a list of its episodes
  updateEpisode(episode) {
    this.#updateRecord("episodes", this.#getEpisodeRecord(episode));
    this.#save();
  }
}

const Ledger = new LedgerSingleton();

export default Ledger;
