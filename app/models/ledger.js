import Datastore from "../core/datastore.js";

const datastore = new Datastore();
const filename = "ledger.json";

/*
- [ ] Index players?
- [ ] Cleanup references to sessions that no longer exist (on start?)
*/

class LedgerSingleton {
  games = [];
  sessions = [];
  players = [];
  active = [];

  initialize() {
    const file = {};

    try {
      const fromDisk = datastore.load(filename);
      Object.assign(file, fromDisk);
    } catch (e) {
      // console.log(e);
      //file doesnt exist, do nothing
      //(we'll create automatically on next save)
    }

    const { games = [], sessions = [], players = [], active = [] } = file;

    this.games.push(...games);
    this.sessions.push(...sessions);
    this.players.push(...players);
    this.active.push(...active);
  }

  //PRIVATE METHODS
  #save() {
    datastore.save(filename, this);
  }

  #getSessionRecord(session) {
    return {
      id: session.id,
      name: session.name,
      date: session.date,
    };
  }

  #getGameRecord(session) {
    return session.game;
  }

  #updateRecord(record, records) {
    if (!record) return;

    const oldRecord = records.find((r) => r.id === record.id);
    if (oldRecord) {
      Object.assign(oldRecord, record);
    } else {
      records.push(record);
    }
  }

  #getById(array) {
    return (id) => array.find((element) => element.id === id);
  }

  //PUBLIC METHODS
  getGameById = this.#getById(this.games);
  getPlayerById = this.#getById(this.players);

  getActiveSession() {
    //TODO: Fix this doofer
    return this.sessions.at(0);
  }

  //TODO: Make sure each game has a list of sessions
  updateSession(session) {
    this.#updateRecord(this.#getSessionRecord(session), this.sessions);
    this.#updateRecord(this.#getGameRecord(session), this.games);

    session.players.forEach((player) => {
      this.#updateRecord(player, this.players);
    });

    if (session.isActive() && !this.active.includes(session)) {
      this.active.push(session);
    } else if (!session.isActive() && this.active.includes(session)) {
      this.active.splice(this.active.indexOf(session), 1);
    }

    this.#save();
  }
}

const Ledger = new LedgerSingleton();

export default Ledger;