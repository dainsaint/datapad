import { html, secondsToTime } from "#core/utils"
import Icon from "#views/ui/icon"

export default function PhaseControls({ phase }) {  
  const currentPhase = phase;
  const phases = phase.episode.phases;
  
  return html`
    <div class="stack" hx-get="${ currentPhase.toURL("/controls") }" hx-trigger="sse:phases" hx-swap="morph:innerHTML">
      <form class="layout-row gap-tight" hx-put="${ currentPhase.toURL() }" >
        <button name="action" value="prev" ${{disabled: false || phases.at(0) == currentPhase }}><i class="fa fa-backward-step"></i></button>
        ${ !currentPhase.isPlaying && html`<button name="action" value="start" ${{disabled: currentPhase.isComplete }}><i class="fa fa-play"></i></button>` }
        ${ currentPhase.isPlaying && html`<button name="action" value="pause" ><i class="fa fa-pause"></i></button>` }
        <button name="action" value="next"><i class="fa fa-forward-step"></i></button>

        <div class="layout-row layout-fill gap">
          <p>${ secondsToTime(currentPhase.timeElapsed) }</p>
          <progress class="layout-fill" ${{ value: currentPhase.timeElapsed, max: currentPhase.duration }}></progress>
          <p>${ secondsToTime(currentPhase.duration) }</p>
        </div>

        <button name="action" value="subtract"><i class="fa fa-minus"></i> <i class="fa fa-clock"></i></button>
        <button name="action" value="add"><i class="fa fa-plus"></i> <i class="fa fa-clock"></i></button>
      </form>
    </div>
  `
}

