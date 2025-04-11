import { DateTime, Duration, Interval } from "luxon";
import Model from "#database/model";
import Tags from "#core/tags";
import Record, { RecordType } from "#models/record";

export default class Phase extends Model {
  type = PhaseType.BLANK;
  status = PhaseStatus.IDLE;
  round = 0;
  duration = 0;
  timeElapsed = 0;

  actualTime = Interval.after( DateTime.now(), Duration.fromObject({ seconds: 0 }));

  tags = new Tags()

  constructor({ type = PhaseType.BLANK, round = 0, duration = 0 }) {
    super();
    Object.assign( this, {type, round, duration} );
  }

  startPhase() {
    this.actualTime = Interval.after( DateTime.now(), Duration.fromObject({ seconds: this.duration }))
    this.status = PhaseStatus.PLAYING;
    this.episode.addRecord(new Record({ type: RecordType.PHASE_STARTED, description: `Round ${this.round}: ${this.type}`, value: new Date().toISOString() }));
  }

  pausePhase() {
    this.status = PhaseStatus.PAUSED;
  }

  completePhase() {
    this.actualTime = Interval.fromDateTimes( this.actualTime.start || DateTime.now(), DateTime.now() );
  
    if( this.isPlaying ) {
      this.episode.addRecord(new Record({ type: RecordType.PHASE_ENDED, description: `Round ${this.round}: ${this.type}`, value: new Date().toISOString() }));
      this.episode.addRecord(new Record({ type: RecordType.PHASE_DURATION, description: `Round ${this.round}: ${this.type}`, value: this.actualTime.toDuration("minutes").toObject().minutes }));
    }

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

  

  get isPlaying() {
    return this.status === PhaseStatus.PLAYING;
  }

  get isComplete() {
    return this.status === PhaseStatus.COMPLETE;
  }

  get timeRemaining() {
    return Math.floor(this.duration - this.timeElapsed);
  }

  get isOverTime() {
    return this.timeRemaining <= 0 ;
  }


  toURL(append = "") {
    return `/episodes/${this.episode.id}/phases/${this.id}` + append;
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