import Datastore from "./datastore.js";
import Community from "../models/community.js";
import Game from "../models/game.js";
import Phase from "../models/phase.js";
import Player from "../models/player.js";
import Resource from "../models/resource.js";
import Session from "../models/session.js";
import Society from "../models/society.js";
import Ledger from "../models/ledger.js";

function initialize() {
  Datastore.registerTypes(
    Community,
    Game,
    Phase,
    Player,
    Resource,
    Session,
    Society
  );

  Ledger.initialize();
}

export default {
  initialize
};