import Model from "../core/model.js";

export default class Session extends Model {
  date = new Date();
  game;
  players = [];
  societies = [];
  phases = [];
  currentRound = 0;
  scheduledTimeStart = new Date();
  scheduledTimeEnd = new Date();

  constructor({name, date = new Date()}) {
    super();
    this.name = name;
    this.date = date;
  }

  addPhase(phase) {
    this.phases.push(phase);
  }
}
