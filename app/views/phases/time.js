import { html, secondsToTime } from "#core/utils"
import Phase from "#models/phase"
import { Duration } from "luxon"


export default function PhaseTime({ phase = new Phase() } = {}) {
  const sign = Math.sign( phase.timeRemaining ) > 0 ? '' : '-';
  const duration = Duration.fromObject({ seconds: Math.max(phase.timeRemaining, 0) });

  return html`
    <div class="phase-time layout-row ${{ "phase-time--overtime": phase.timeElapsed > phase.duration + 5 }}" hx-get="${ phase.toURL('/time') }" hx-swap="outerHTML" hx-trigger="sse:phases">
      <header>
        <p class="text-detailing">Round ${phase.round}</p>  
        <h2 class="text-heading">${phase.type.toUpperCase()}</h2>
      </header>
      <time datetime="${phase.timeRemaining}s">${duration.toFormat('mm:ss')}</time>    
    </div>
  `
}