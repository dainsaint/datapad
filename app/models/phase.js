import Model from "../core/model.js";

export default class Phase extends Model {
  name = "";
  round = 0;
  length = 0;
  timeElapsed = 0;
  timeStarted = new Date();
  timeCompleted = new Date();

  constructor(name, round, length) {
    super();
    this.name = name;
    this.round = round;
    this.length = length;
  }


  get timeRemaining() {
    return this.length - this.timeElapsed;
  }
}
