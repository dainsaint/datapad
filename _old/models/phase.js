import { DateTime, Duration, Interval } from "luxon";
import EpisodeModel from "#database/episode-model"
import Tags from "#core/tags";

export default class Phase extends EpisodeModel {
  type = PhaseType.BLANK;
  status = PhaseStatus.IDLE;
  round = 0;
  duration = 0;
  timeElapsed = 0;
  tags = new Tags();

  actualTime = Interval.after( DateTime.now(), Duration.fromObject({ seconds: 0 }));

  constructor({ type = PhaseType.BLANK, round = 0, duration = 0 }) {
    super();
    Object.assign( this, {type, round, duration} );
  }

  get timeRemaining() {
    return Math.floor(this.duration - this.timeElapsed);
  }

  get isPlaying() {
    return this.status === PhaseStatus.PLAYING;
  }

  get isComplete() {
    return this.status === PhaseStatus.COMPLETE;
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


  split() {
    if( this.timeElapsed == 0 || this.timeElapsed >= this.duration) {
      return [this];
    }

    const phaseA = new Phase({
      type: this.type,
      round: this.round,
      duration: this.timeElapsed
    })

    const phaseB = new Phase({
      type: this.type,
      round: this.round,
      duration: this.timeRemaining,
    });

    phaseA.timeElapsed = this.timeElapsed;

    for( const tag of this.tags.values() ) {
      phaseA.tags.add(tag);
      phaseB.tags.add(tag);
    }

    return [phaseA, phaseB];
  }


  tick(deltaTimeMS) {
    if (this.isPlaying) {
      this.timeElapsed += deltaTimeMS / 1000;
    }
  }

  toURL(append = "") {
    return `/episodes/${this.episodeId}/phases/${this.id}` + append;
  }
}

export const PhaseStatus = {
  IDLE: "idle",
  PLAYING: "playing",
  PAUSED: "paused",
  COMPLETE: "complete"
}

export const PhaseType = {
  BLANK: "Blank Phase",
  SETUP: "Setup Phase",
  UNIVERSAL: "Universal Phase",
  SOCIETAL: "Societal Phase",
  GALACTIC: "Galactic Phase",  
  INDIVIDUAL: "Individual Phase",
  GENERATIONAL: "Generational Phase",
  CONCLUSION: "Conclusion Phase"
}