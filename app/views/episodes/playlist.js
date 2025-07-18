import { html, secondsToTime } from "#core/utils";
import { Duration } from "luxon";

export default function EpisodePlaylist({ episode }) {
  const currentPhase = episode.currentPhase;
  const phaseGroups = episode.getPhaseGroups();
  const totalTime = Duration.fromObject({ seconds: episode.phases.reduce ( (total, phase) => total + Math.floor( Math.max(phase.duration, phase.timeElapsed) ), 0 ) });
      

  const renderRound = ({round, phases}) => html`
    <details id="round-${ phases[0].id }" class="phase-playlist__round" ${{open: currentPhase.round == round}}>
      <summary class="phase-playlist__header"><i class="fa fa-up-down drag-handle mode--editing"></i> Round ${round} (${ secondsToTime( phases.reduce( (sum, phase) => sum + phase.duration, 0 )) })</summary>
      ${ renderPhases({ phases }) }
    </details>`

  const renderPhases = ({ phases }) => html`
    ${ phases.map( (phase) => html`
      <div id="${ phase.id }" class="phase-playlist__phase phase-playlist__phase--${ phase.type.split(' ')[0].toLowerCase() } ${{ "phase-playlist__phase--current": phase == currentPhase }}">
        <div hx-get="${ phase.toURL("/edit") }" hx-target="#dialog" ><i class="fa fa-up-down drag-handle mode--editing"></i> ${phase.type}</div>

        <div>
          <span hx-get="${ phase.toURL("/edit") }" hx-target="#dialog" >${secondsToTime( phase.timeElapsed ) } / ${secondsToTime( phase.duration ) }</span>
          <a class="mode--editing" hx-delete="${ phase.toURL() }" hx-confirm="Delete for sure?"> <i class="fa fa-trash"></i></a>
          <input name="phaseIds[]" type="hidden" value="${ phase.id }"/>
        </div>
      </div>`)}`

  return html`
    <div id="playlist"
      class="scrollable"
    >
      <form
        class="phase-playlist stack"
        hx-put="${ episode.toURL("/playlist") }"
        hx-swap="none"
        hx-disinherit="*"
      >

        <p class="text-body">Total time: ${ totalTime.rescale().toHuman({ unitDisplay: "short"}) }</p>

        
        <div class="layout-spread">
          <div>
            <button 
              type="button"
              class="mode--default js-phase-playlist-toggle-editing" 
              onclick="this.closest('.phase-playlist').classList.toggle('phase-playlist--editing')">
              <i class="fa fa-clipboard-list"></i> edit playlist
            </button>

            <button 
              type="submit"
              class="mode--editing js-phase-playlist-toggle-editing" 
              onclick="this.closest('.phase-playlist').classList.toggle('phase-playlist--editing')">
              <i class="fa fa-clipboard-check"></i> done editing
            </button>
          </div>

          <div class="phase-playlist__add-menu mode--editing">
            <button
              type="button"
              hx-get="/phases/${episode.id}/create"
              hx-target="#dialog">
              <i class="fa fa-square-plus"></i> add phase
            </button>

            <button
              type="button"
              hx-post="/phases/${episode.id}/round"
              hx-swap="none"
              >
              <i class="fa fa-folder-plus"></i> add round
            </button>
          </div>
        </div>

        <div 
          class="phase-playlist__list full stack-tight" 
          data-sortable="phase" 
          data-sortable-handle=".drag-handle"
        >
          
        ${ phaseGroups.map( (group) => html`
          <div class="phase-playlist__group">
            ${ group.isRound ? renderRound(group) : renderPhases( group ) }
          </div>
        ` )}
        </div>
      </form>
    </div>
  `
}