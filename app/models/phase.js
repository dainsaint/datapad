import Tags from "../core/tags.js";
import SessionModel from "./session-model.js";

export default class Phase extends SessionModel {
  status = PhaseStatus.IDLE;
  round = 0;
  duration = 0;
  timeElapsed = 0;
  tags = new Tags();

  scheduledTimeStart = new Date();
  scheduledTimeEnd = new Date();

  actualTimeStart = new Date();
  actualTimeComplete = new Date();

  constructor({ name = "", round = 0, duration = 0 }) {
    super();
    Object.assign( this, {name, round, duration} );
  }

  get timeRemaining() {
    return Math.floor(this.duration - this.timeElapsed);
  }

  get isPlaying() {
    return this.status === PhaseStatus.PLAYING;
  }

  startPhase() {
    this.actualTimeStart = new Date();
    this.status = PhaseStatus.PLAYING;
  }

  pausePhase() {
    this.status = PhaseStatus.PAUSED;
  }

  completePhase() {
    this.actualTimeComplete = new Date();
    this.status = PhaseStatus.COMPLETE;
  }

  tick(deltaTimeMS) {
    if (this.isPlaying) {
      this.timeElapsed += deltaTimeMS / 1000;
    }
  }

  toURL(append = "") {
    return `/sessions/${this.session}/phases/${this.id}` + append;
  }
}

export const PhaseStatus = {
  IDLE: "idle",
  PLAYING: "playing",
  PAUSED: "paused",
  COMPLETE: "complete"
}