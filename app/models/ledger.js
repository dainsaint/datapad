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
    const file = { games: [], sessions: [], players: [], active: [] };

    try {
      const fromDisk = datastore.load(filename);
      Object.assign(file, fromDisk);
    } catch (e) {
      if( e.code !== "ENOENT" ) {
        //ENONENT means file doesnt exist, thats fine
        //(we'll create automatically on next save)
        //any other error, we should see
        console.log(e);
      } 
    }

    Object.assign(this, file);
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

  #updateRecord(key, record) {
    if (!record) return;

    const oldRecord = this[key].find((r) => r.id === record.id);
    if (oldRecord) {
      Object.assign(oldRecord, record);
    } else {
      this[key].push(record);
    }
  }

  #getById(key) {
    return (id) => this[key].find((element) => element.id === id);
  }

  //PUBLIC METHODS
  getGameById = this.#getById("games");
  getPlayerById = this.#getById("players");

  getActiveSession() {
    //TODO: Fix this doofer
    return this.sessions.at(0);
  }

  //TODO: Make sure each game has a list of its sessions
  updateSession(session) {
    this.#updateRecord("sessions", this.#getSessionRecord(session));
    this.#updateRecord("games", this.#getGameRecord(session));

    session.players.forEach((player) => {
      this.#updateRecord("players", player);
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