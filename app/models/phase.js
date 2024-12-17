import { DateTime, Duration, Interval } from "luxon";
import Tags from "../core/tags.js";
import SessionModel from "./session-model.js";

export default class Phase extends SessionModel {
  
  name = "New Phase"
  status = PhaseStatus.IDLE;
  round = 0;
  duration = 0;
  timeElapsed = 0;
  tags = new Tags();

  scheduledTime = Interval.after( DateTime.now(), Duration.fromObject({ seconds: 0 }));
  actualTime = Interval.after( DateTime.now(), Duration.fromObject({ seconds: 0 }));

  constructor({ name = "New Phase", round = 0, duration = 0 }) {
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
    this.actualTime = Interval.after( DateTime.now(), Duration.fromObject({ seconds: this.duration }))
    this.status = PhaseStatus.PLAYING;
  }

  pausePhase() {
    this.status = PhaseStatus.PAUSED;
  }

  completePhase() {
    this.actualTime = Interval.fromDateTimes( this.actualTime.start || DateTime.now(), DateTime.now() );
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