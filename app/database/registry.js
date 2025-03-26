import Tags from "#core/tags";
// import Ledger from "#database/ledger";
import Action from "#models/action";
import Community from "#models/community";
import Episode from "#models/episode";
// import Game from "#models/game";
import Phase from "#models/phase";
import Player from "#models/player";
import Record from "#models/record";
import Resource from "#models/resource";
import Society from "#models/society";
import Ledger from "#database/ledger";
import Serializer from "#database/serializer";


function initialize() {
  Serializer.register("Action", Action);
  Serializer.register("Community", Community);
  // Serializer.register("Game", Game);
  Serializer.register("Phase", Phase);
  Serializer.register("Player", Player);
  Serializer.register("Resource", Resource);
  Serializer.register("Episode", Episode);
  Serializer.register("Record", Record);
  Serializer.register("Society", Society);
  Serializer.register("Tags", Tags);

  Ledger.initialize();
}

export default {
  initialize,
};
