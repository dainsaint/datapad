import Model from "../core/model.js";

export default class Session extends Model {
  date = new Date();
  game;
  players = [];
  societies = [];
  phases = [];
  currentRound = 0;
}
