import { html, secondsToTime } from "#core/utils"
import Phase from "#models/phase"


export default function PhaseTime({ phase = new Phase() } = {}) {
  return html`
    <div class="phase-time" hx-get="${ phase.toURL('/time') }" hx-trigger="sse:phases">
      <header>
        <p class="subtitle">Round ${phase.round}</p>  
        <h2>${phase.type}</h2>
      </header>
      <time datetime="${phase.timeRemaining}s">${secondsToTime(phase.timeRemaining)}</time>    
    </div>
  `
}