import { DateTime, Duration, Interval } from "luxon";
import Datastore from "#database/datastore";
import Model from "#database/model";
import Tags from "#core/tags";
import Ledger from "#database/ledger";
import Game from "./game";

const datastore = new Datastore();

export default class Episode extends Model {
  name = ""
  date = DateTime.now()
  scheduledTime = Interval.after(DateTime.now(), Duration.fromObject({hours: 5}))
  game = Game.NONE
  communities = []
  phases = []
  players = []
  resources = []
  societies = []
  tags = new Tags()

  static #episodes = new Map();

  constructor({name = "", date = DateTime.now(), scheduledTime = Interval.after(DateTime.now(), Duration.fromObject({hours: 5})) } = {}){
    super();
    Object.assign(this, {name, date, scheduledTime});
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
    return this.phases.filter((phase) => phase.isComplete)
  }

  getAllResources() {
    return this.communities.map((community) => community.resources).flat();
  }

  makeActive() {
    this.tags.add(EpisodeTags.ACTIVE);
  }

  isActive() {
    return this.tags.has(EpisodeTags.ACTIVE);
  }

  save() {
    const filename = datastore.getFilename({ type: "episodes", id: this.id});
    datastore.save(filename, this);
    Ledger.updateEpisode(this);
  }

  toURL(append = "") {
    return `/episodes/${this.id}` + append;
  }
 
  static load(id) {
    if (this.#episodes.has(id)) {
      return this.#episodes.get(id);
    }

    const filename = datastore.getFilename({ type: "episodes", id });
    const episode = datastore.load(filename);
    this.#episodes.set(id, episode);
    return episode;
  };
};


export function validate() {

}


export class EpisodeModel extends Model {
  episode = "";
}

export const EpisodeTags = {
  ACTIVE: "active",
  COMPLETE: "complete",
};