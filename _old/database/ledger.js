import Episode from "#models/episode";
import Datastore from "../database/datastore.js";

const datastore = new Datastore();
const filename = "ledger.json";

/*
- [ ] Index players?
- [ ] Cleanup references to episodes that no longer exist (on start?)
*/

class LedgerSingleton {
  games = [];
  episodes = [];
  players = [];
  active = [];
  index = {};

  #collections = [];

  initialize() {
    const file = {
      games: [],
      episodes: [],
      players: [],
      active: [],
      index: {},
    };

    try {
      const fromDisk = datastore.load(filename);
      Object.assign(file, fromDisk);
    } catch (e) {
      if (e.code !== "ENOENT") {
        //ENONENT means file doesnt exist, thats fine
        //(we'll create automatically on next save)
        //any other error, we should see
        console.log(e);
      }
    }

    Object.assign(this, file);


    //introspection
    const episode = new Episode();
    this.#collections = Object.keys(episode).filter( key => Array.isArray(episode[key]) );
  }

  //PRIVATE METHODS
  #save() {
    datastore.save(filename, this);
  }

  #getEpisodeRecord(episode) {
    return {
      id: episode.id,
      name: episode.name,
      date: episode.date,
    };
  }

  #getGameRecord(episode) {
    return episode.game || undefined;
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

  #getEpisodeByModelId(key = "") {
    return (id = "") => {
      const episodeId = this.#getEpisodeIdFor(key, id);
      return Episode.load(episodeId);
    };
  }

  #getEpisodeIdFor(collection, id) {
    return Object.entries(this.index[collection])
      .find(([episodeId, modelIds]) => modelIds.includes(id))
      ?.at(0);
  }
  
  #indexEpisodeCollection(episodeId, collection, array) {
    this.index[collection] ??= {};
    this.index[collection][episodeId] = array.map((item) => item.id);
  }

  #indexEpisode(episode) {
    for (const key of this.#collections) {
      this.#indexEpisodeCollection(episode.id, key, episode[key]);
    }
  }

  //PUBLIC METHODS
  getGameById = this.#getById("games");
  getPlayerById = this.#getById("players");

  getEpisodeByActionId = this.#getEpisodeByModelId("actions");
  getEpisodeByCommunityId = this.#getEpisodeByModelId("communities");
  getEpisodeByPhaseId = this.#getEpisodeByModelId("phases");
  getEpisodeByPlayerId = this.#getEpisodeByModelId("players");
  getEpisodeByResourceId = this.#getEpisodeByModelId("resources");
  getEpisodeBySocietyId = this.#getEpisodeByModelId("societies");


  // collection(key = "") {
  //   let array = [];

  //   if( key == "episodes" ) {
  //     array = this.episodes;
  //   } else if( key == "games" ){
  //     array = this.games;
  //   } else if( this.#collections.includes(key) ) {
  //     return {
  //       get: (id) => {
  //         const episode = this.#getEpisodeByModelId(key);
  //       }
  //     }
  //   } else {
  //     throw new Error(`No addressable collection named ${key} in episodes or ledger`);
  //   }

  //   return array;
  // }
  

  getActiveEpisode() {
    //TODO: Fix this doofer
    return this.episodes.at(0);
  }

  //TODO: Make sure each game has a list of its episodes
  updateEpisode(episode) {
    this.#updateRecord("episodes", this.#getEpisodeRecord(episode));
    this.#updateRecord("games", this.#getGameRecord(episode));

    episode.players.forEach((player) => {
      this.#updateRecord("players", player);
    });

    this.#indexEpisode(episode);

    if (episode.isActive() && !this.active.includes(episode)) {
      this.active.push(episode);
    } else if (!episode.isActive() && this.active.includes(episode)) {
      this.active.splice(this.active.indexOf(episode), 1);
    }

    this.#save();
  }
}

const Ledger = new LedgerSingleton();

export default Ledger;
