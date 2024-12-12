import Tags from "../core/tags.js";
import { SessionModel } from "./session.js";

export default function Phase({ 
  name = "",
  round = 0,
  duration = 0
}) {
  const model = SessionModel({ type: "Phase" });

  let status = PhaseStatus.IDLE;
  let timeElapsed = 0, actualTimeComplete, actualTimeStart;
  
  const phase = {
    ...model,
    name,
    round,
    duration,
    status,

    timeElapsed,
    actualTimeStart,
    actualTimeComplete,

    timeRemaining() {
      return Math.floor(duration - timeElapsed);
    },

    actualDuration() {
      return actualTimeComplete - actualTimeStart;
    },

    startPhase() {
      actualTimeStart = new Date();
      status = PhaseStatus.PLAYING;
    },

    pausePhase() {
      phase.status = PhaseStatus.PAUSED;
    },

    completePhase() {
      actualTimeComplete = new Date();
      phase.status = PhaseStatus.COMPLETE;
    },

    tick(deltaTimeMS) {
      if ( phase.status === PhaseStatus.PLAYING ) {
        timeElapsed += deltaTimeMS / 1000;
      }
    },

    toURL(append = "") {
      return `/sessions/${phase.session}/phases/${phase.id}` + append;
    },
  };

  return phase;
}

export const PhaseStatus = {
  IDLE: "idle",
  PLAYING: "playing",
  PAUSED: "paused",
  COMPLETE: "complete"
}