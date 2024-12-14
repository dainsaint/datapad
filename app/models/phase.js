import Tags from "../core/tags.js";
import SessionModel from "./session-model.js";

export default class Phase extends SessionModel {
  status = PhaseStatus.IDLE;
  duration = 0;
  timeElapsed = 0;
  tags = new Tags();
  actualTimeStart
  actualTimeComplete

  constructor({ name = "", round = 0, duration = 0 }) {
    super();
    this.name = name;
    this.round = round;
    this.duration = duration;
  }

  get timeRemaining() {
    return Math.floor(this.duration - this.timeElapsed);
  }

  get actualDuration() {
    return this.actualTimeComplete - this.actualTimeStart;
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