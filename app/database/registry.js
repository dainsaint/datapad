import Tags from "#core/tags";
import Ledger from "#database/ledger";
import Community from "#modules/communities/model";
import Episode from "#modules/episodes/model";
import Game from "#modules/games/model";
import Phase from "#modules/phases/model";
import Player from "#modules/players/model";
import Resource from "#modules/resources/model";
import Society from "#modules/societies/model";
import Serializer from "./serializer.js";

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
