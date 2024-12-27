import { DateTime, Duration, Interval } from "luxon";
import Datastore from "../database/datastore.js";
import Model from "./model.js";
import Tags from "../core/tags.js";
import Ledger from "./ledger.js";
import { PhaseStatus } from "./phase.js";

const datastore = new Datastore();

export default class Episode extends Model {
  name = ""
  date = DateTime.now()
  game = {}
  communities = []
  phases = []
  players = []
  resources = []
  societies = []
  tags = new Tags()

  scheduledTime = Interval.after(DateTime.now(), Duration.fromObject({hours: 5}))

  static #episodes = new Map();

  constructor({name = "", date = DateTime.now() } = {}){
    super();
    Object.assign(this, {name, date});
  }

  get currentRound() {
    return this.phases.at(0)?.round;
  }

  //Helper functions
  #addTo(key) {
    return (object) => {
      object.episode = this.id;
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
    const filename = datastore.getFilename({ type: "Episode", id: this.id});
    datastore.save(filename, this);
    Ledger.updateSession(this);
  }

  toURL(append = "") {
    return `/episodes/${this.id}` + append;
  }
 
  static load(id) {
    if (this.#episodes.has(id)) {
      return this.#episodes.get(id);
    }

    const filename = datastore.getFilename({ type: "Episode", id });
    const episode = datastore.load(filename);
    this.#episodes.set(id, episode);
    return episode;
  };
};

export class EpisodeModel extends Model {
  episode;

  constructor({ episode = "" }) {
    super();
    this.episode = episode;
  }
}

export const SessionTags = {
  ACTIVE: "active",
  COMPLETE: "complete",
};