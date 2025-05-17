import { html, secondsToTime } from "#core/utils";
import { Duration } from "luxon";

export default function EpisodePlaylist({ episode }) {
  const currentPhase = episode.currentPhase;
  const phaseGroups = episode.getPhaseGroups();
  const totalTime = Duration.fromObject({ seconds: episode.phases.reduce ( (total, phase) => total + Math.floor( Math.max(phase.duration, phase.timeElapsed) ), 0 ) });
      

  const renderRound = ({round, phases}) => html`
    <details id="round-${ phases[0].id }"class="phase-playlist__round" ${{open: currentPhase.round == round}}>
      <summary class="phase-playlist__header"><i class="fa fa-up-down drag-handle mode--editing"></i> Round ${round} (${ secondsToTime( phases.reduce( (sum, phase) => sum + phase.duration, 0 )) })</summary>
      ${ renderPhases({ phases }) }
    </details>`

  const renderPhases = ({ phases }) => html`
    ${ phases.map( (phase) => html`
      <div id="${ phase.id }" hx-get="${ phase.toURL("/edit") }" hx-target="#dialog" class="phase-playlist__phase phase-playlist__phase--${ phase.type.split(' ')[0].toLowerCase() } ${{ "phase-playlist__phase--current": phase == currentPhase }}">
        <div><i class="fa fa-up-down drag-handle mode--editing"></i> ${phase.type}</div>

        <div>
          ${secondsToTime( phase.timeElapsed ) } / ${secondsToTime( phase.duration ) }
          <a class="mode--editing" hx-delete="${ phase.toURL() }" hx-confirm="Delete for sure?"> <i class="fa fa-trash"></i></a>
          <input name="phaseIds[]" type="hidden" value="${ phase.id }"/>
        </div>
      </div>`)}`

  return html`
    <div id="playlist" class="phase-playlist stack" 

      >

      <h1>Playlist</h1>
      <p class="text-body">Total time: ${ totalTime.rescale().toHuman({ unitDisplay: "short"}) }</p>

      
      <div class="layout-spread">
        <div>
          <button 
            class="mode--default js-phase-playlist-toggle-editing" 
            onclick="this.closest('.phase-playlist').classList.toggle('phase-playlist--editing')">
            <i class="fa fa-clipboard-list"></i> edit playlist
          </button>

          <button 
            class="mode--editing js-phase-playlist-toggle-editing" 
            onclick="this.closest('.phase-playlist').classList.toggle('phase-playlist--editing')">
            <i class="fa fa-clipboard-check"></i> done editing
          </button>
        </div>

        <div class="phase-playlist__add-menu mode--editing">
          <button
            hx-get="${ episode.toURL('/phases/create') }"
            hx-target="#dialog">
            <i class="fa fa-square-plus"></i> add phase
          </button>

          <button
            hx-post="${ episode.toURL('/phases/round') }">
            <i class="fa fa-folder-plus"></i> add round
          </button>
        </div>
      </div>

      <form 
        class="phase-playlist__list scrollable stack-tight" 
        data-sortable="phase" 
        data-sortable-handle=".drag-handle"
        style="max-height: 70vh; padding-bottom: 10vh;"
        hx-put="${ episode.toURL("/playlist") }"
        hx-swap="none"
        hx-trigger="sorted"
        hx-disinherit="*"
      >
        
      ${ phaseGroups.map( (group) => html`
        <div class="phase-playlist__group">
          ${ group.isRound ? renderRound(group) : renderPhases( group ) }
        </div>
      ` )}

      </form>


    </div>

  `
}




