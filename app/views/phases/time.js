import { secondsToTime } from "../../core/utils.js";
import Phase from "../../models/phase.js";

export default function PhaseTime({ phase = new Phase() } = {}) {
  return `
    <div class="phase-time" hx-get="${ phase.toURL('/time') }" hx-trigger="sse:phases">
      <header>
        <h2>${phase.name}</h2>
        <p class="subtitle">Round ${phase.round + 1}</p>
      </header>
      <time datetime="${phase.timeRemaining}s">${secondsToTime(phase.timeRemaining)}</time>    
    </div>
  `
}