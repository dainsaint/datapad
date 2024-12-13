import Tags from "../core/tags.js";
import { SessionModel } from "./session.js";

export default function Phase({ 
  name = "",
  round = 0,
  duration = 0
}) {
  const model = SessionModel({ type: "Phase" });

  let timeElapsed = 0, actualTimeComplete, actualTimeStart;
  
  const phase = {
    ...model,
    name,
    round,
    duration,
    status: PhaseStatus.IDLE,

    timeElapsed,
    // actualTimeStart,
    // actualTimeComplete,

    timeRemaining() {
      return Math.floor(phase.duration - phase.timeElapsed);
    },

    // actualDuration() {
    //   return phase.actualTimeComplete - phase.actualTimeStart;
    // },

    startPhase() {
      // actualTimeStart = new Date();
      phase.status = PhaseStatus.PLAYING;
    },

    pausePhase() {
      phase.status = PhaseStatus.PAUSED;
    },

    completePhase() {
      // actualTimeComplete = new Date();
      phase.status = PhaseStatus.COMPLETE;
    },

    isActive() {
      return phase.status === PhaseStatus.PLAYING;
    },

    tick(deltaTimeMS) {
      if ( phase.isActive() ) {
        phase.timeElapsed += deltaTimeMS / 1000;
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