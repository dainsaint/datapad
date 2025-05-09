import { html, secondsToTime } from "#core/utils"
import Icon from "#views/ui/icon"

export default function PhaseControls({ phase }) {  
  const currentPhase = phase;
  const phases = phase.episode.phases;
  
  return html`
    <div class="stack" hx-get="${ currentPhase.toURL("/controls") }" hx-trigger="sse:phases" hx-swap="morph:innerHTML">
      <form class="layout-row gap-tight" hx-put="${ currentPhase.toURL() }" >
        <button name="action" value="prev" ${{disabled: false || phases.at(0) == currentPhase }}>${ Icon("previous") }</button>
        ${ !currentPhase.isPlaying && html`<button name="action" value="start" ${{disabled: currentPhase.isComplete }}>${ Icon("play") }</button>` }
        ${ currentPhase.isPlaying && html`<button name="action" value="pause" >${ Icon("pause") }</button>` }
        <button name="action" value="next">${ Icon("next") }</button>
          <!--button name="action" value="next" ${{disabled: phases.at(-1) == currentPhase }}>${ Icon("next") }</button-->

        <div class="layout-row layout-fill gap">
          <p>${ secondsToTime(currentPhase.timeElapsed) }</p>
          <progress class="layout-fill" ${{ value: currentPhase.timeElapsed, max: currentPhase.duration }}></progress>
          <p>${ secondsToTime(currentPhase.duration) }</p>
        </div>

      </form>
    </div>
  `
}

