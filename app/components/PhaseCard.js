import { secondsToTime } from "../core/utils.js";

export default function PhaseCard( phase, i ) { 
  const headings = ["Now", "Next", "Then"];
  return `
    <div class="card ${i == 0 ? 'card-fancy color-contrast' : 'card-transparent'} stack">
      <p class="annotation">${headings[i]}</p>
      ${ PhaseTime(phase) }
    </div>
  `;
}

export function PhaseTime( phase ) {
  return `
    <div class="phase-time" hx-get="${ phase.toURL('/time') }" hx-trigger="sse:phases">
      <header>
        <h2>${phase.name}</h2>
        <p class="subtitle">Round ${phase.round + 1}</p>
      </header>
      <time datetime="${phase.timeRemaining}s">${secondsToTime(phase.timeRemaining())}</time>    
    </div>
  `
}