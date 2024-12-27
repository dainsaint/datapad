import Serializer from "./serializer.js";
import Community from "../models/community.js";
import Game from "../models/game.js";
import Phase from "../models/phase.js";
import Player from "../models/player.js";
import Resource from "../models/resource.js";
import Episode from "../models/episode.js";
import Society from "../models/society.js";
import Ledger from "../models/ledger.js";
import Tags from "../core/tags.js";

function initialize() {
  Serializer.register("Community", Community);
  Serializer.register("Game", Game);
  Serializer.register("Phase", Phase);
  Serializer.register("Player", Player);
  Serializer.register("Resource", Resource);
  Serializer.register("Episode", Episode);
  Serializer.register("Society", Society);
  Serializer.register("Tags", Tags);

  Ledger.initialize();
}

export default {
  initialize,
};
