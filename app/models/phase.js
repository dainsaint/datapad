import Model from "../core/model.js";

export default class Phase extends Model {
  name = "";
  round = 0;
  length = 0;

  scheduledTimeStart = new Date();
  scheduledTimeEnd = new Date();
  actualTimeStart;
  actualTimeComplete;
  timeElapsed = 0;

  isPlaying = false;

  constructor(name, round, length) {
    super();
    this.name = name;
    this.round = round;
    this.length = length;
  }

  get timeRemaining() {
    return Math.floor(this.length - this.timeElapsed);
  }

  get actualLength() {
    return this.actualTimeComplete - this.actualTimeStart;
  }

  startPhase() {
    this.actualTimeStart = new Date();
    this.isPlaying = true;
  }

  pausePhase() {
    this.isPlaying = false;
  }

  completePhase() {
    this.actualTimeComplete = new Date();
    this.isPlaying = false;
  }

  tick(deltaTimeMS) {
    if (this.isPlaying) this.timeElapsed += deltaTimeMS/1000;
  }
}
