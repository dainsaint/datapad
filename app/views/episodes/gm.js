import { html, secondsToTime } from "#core/utils";
import { PhaseType } from "#models/phase";
import EpisodeLayout from "#views/episodes/components/layout";
import PhaseControls from "#views/phases/controls";
import SocietyList from "#views/societies/list";
import Icon from "#views/ui/icon";
import { Duration } from "luxon";


export default function EpisodeGameMaster ({ episode } = {}) {
  const currentPhase = episode.currentPhase;

  const content = html`
    <main class="content stack">

      ${ PhaseControls({ phase: currentPhase }) }

      <div class="grid-two">

        <div class="stack">
          <h1>Society Overview</h1>

          ${SocietyList({ episode })}

          <form 
            hx-get="${ episode.toURL('/societies/create') }"
            hx-target="#dialog"
            >
            <button>+ Create a new society</button>
          </form>
        </div>


        ${ EpisodePlaylist({ episode }) }      
      </div>
    </main>
  `;

  return EpisodeLayout({ episode }, content );
}






export function EpisodePlaylist({ episode }) {

  const currentPhase = episode.currentPhase;
  const phaseGroups = episode.getPhaseGroups();

  const totalTime = Duration.fromObject({ seconds: episode.phases.reduce ( (total, phase) => total + Math.floor( Math.max(phase.duration, phase.timeElapsed) ), 0 ) });

  const renderRound = ({isRound, round, phases}) => html`

    <details class="phase-playlist__round" g${{open: currentPhase.round == round}}>
      <summary class="phase-playlist__header">Round ${round}</summary>

      <div data-sortable="phase">
        ${ renderPhases({ isRound, round, phases }) }
      </div>

    </details>


    
  `

  const renderPhases = ({ phases }) => html`
      ${ phases.map( (phase, i) => html`
    
          
        <div class="phase-playlist__phase phase-playlist__phase--${ phase.type.split(' ')[0].toLowerCase() } ${{ "phase-playlist__phase--current": phase == currentPhase }}">
          <div>${phase.round} ${phase.type} <a hx-get="${ phase.toURL("/edit") }" hx-target="#dialog">${ Icon("pencil") }</a> </div>

          <div>
            ${secondsToTime( phase.timeElapsed ) } / ${secondsToTime( phase.duration ) }  <a hx-delete="${ phase.toURL() }"><i class="fa fa-trash"></i></a>
            <input name="phaseIds[]" type="hidden" value="${ phase.id }"/>
          </div>

      </div>
      `)}`


  return html`
    <div class="stack">
      <h1>Timeline</h1>
      <p>${ episode.phases.length } phases<br/>${ totalTime.rescale().toHuman({ unitDisplay: "short"}) }</p>

      
      <form 
        class="phase-playlist scrollable stack-tight" 
        data-sortable="phase" 
        style="max-height: 70vh;"

        hx-put="${ episode.toURL("/phases") }"
        hx-trigger="sorted"
      >
    
        
      ${ phaseGroups.map( (group) => group.isRound 
          ? html`
            <div class="phase-playlist__group">
              ${ renderRound(group) }
            </div>` 
          : html`
            <div class="phase-playlist__group" data-sortable="phase">
              ${ renderPhases( group ) }
            </div>`
      )}

      </form>

      <form 
        class="layout-row gap-tight"
        hx-get="${ episode.toURL('/phases/create') }"
        hx-target="#dialog"
        >
        <button><i class="fa fa-bars-staggered"></i> add phase</button>
        <button><i class="fa fa-arrows-spin"></i> add round</button>
      </form>

    </div>
  `
}


// <div style="text-align: center; border-bottom: 1px solid lightgrey; translate: 0 -50%; position: relative">
// <span style="display: inline-block; position: relative; translate: 0 50%;">
  // <a style="padding: .25rem; background: white; ">add phase</a>  <a style="padding: .25rem; background: white; ">add round</a>
// </span>
// </div>