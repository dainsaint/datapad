import Datastore from "../core/datastore.js";
import Model from "../core/model.js";
import Tags from "../core/tags.js";
import Ledger from "./ledger.js";
import { PhaseStatus } from "./phase.js";

const datastore = new Datastore();

export default class Session extends Model {
  name = ""
  date = new Date()
  game = {}
  communities = []
  phases = []
  players = []
  resources = []
  societies = []
  tags = new Tags()

  static #sessions = new Map();

  constructor({name = "", date = new Date()} = {}){
    super();
    Object.assign(this, {name, date});
  }

  get currentRound() {
    return this.phases.at(0)?.round;
  }

  //Helper functions
  #addTo(key) {
    return (object) => {
      object.session = this.id;
      this[key].push(object);
    }
  }

  #getById(key) {
    return (id) => this[key].find( element => element.id === id );
  }

  addCommunity = this.#addTo("communities")
  addPhase = this.#addTo("phases")
  addPlayer = this.#addTo("players")
  addResource = this.#addTo("resources")
  addSociety = this.#addTo("societies")

  getCommunityById = this.#getById("communities")
  getPhaseById = this.#getById("phases")
  getPlayerById = this.#getById("players")
  getResourceById = this.#getById("resources")
  getSocietyById = this.#getById("societies")

  getActivePhases() {
    return this.phases.filter((phase) => phase.status !== PhaseStatus.COMPLETE);
  }

  getAllResources() {
    return this.communities.map((community) => community.resources).flat();
  }

  makeActive() {
    this.tags.add(SessionTags.ACTIVE);
  }

  isActive() {
    return this.tags.has(SessionTags.ACTIVE);
  }

  save() {
    const filename = datastore.getFilename({ type: "Session", id: this.id});
    datastore.save(filename, this);
    Ledger.updateSession(this);
  }

  toURL(append = "") {
    return `/sessions/${this.id}` + append;
  }
 
  static load(id) {
    if (this.#sessions.has(id)) {
      return this.#sessions.get(id);
    }

    const filename = datastore.getFilename({ type: "Session", id });
    const session = datastore.load(filename);
    this.#sessions.set(id, session);
    return session;
  };
};

export class SessionModel extends Model {
  session;

  constructor({ session = "" }) {
    super();
    this.session = session;
  }
}

export const SessionTags = {
  ACTIVE: "active",
  COMPLETE: "complete",
};