import Model from "./model.js";

export default class Session extends Model {
  date = new Date();
  societies = [];
  rounds = [];
  currentRound = 0;
}
