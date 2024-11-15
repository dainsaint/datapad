import Model from "../core/model.js";

export default class Session extends Model {
  date = new Date();
  societies = [];
  phases = [];
  currentRound = 0;
}
