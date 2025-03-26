import { html, secondsToTime } from "#core/utils";
import Episode from "#models/episode";
import { PhaseType } from "#models/phase";
import EpisodeLayout from "#views/episodes/components/layout";
import PhaseCard from "#views/phases/card";
import SocietyList from "#views/societies/list";

export default function EpisodeGameMaster ({ episode } = {}) {
  // console.log( episode );
  const phasesToDisplay = episode.activePhases.slice(0,3);
  const currentPhase = episode.currentPhase;

  const content = html`

    ${ PhaseTimeline({ currentPhase, phases: episode.phases })}

    <main class="content scrollable grid-two">
      <div class="stack-loose">

        <div class="stack">
          <h1>Timeline</h1>
          <div class="switch">
          ${ phasesToDisplay.map((phase, i) => PhaseCard({phase, i})) }
          </div>
        </div>

        ${ currentPhase ?  PhaseControls({ currentPhase, phases: episode.phases }): "No Phases Created yet"}

      </div>

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
    </main>
  `;

  return EpisodeLayout({ episode }, content );
}

function PhaseControls({ currentPhase, phases }) {
  const canEnterCrisisMode = currentPhase.type == PhaseType.SOCIETAL  || currentPhase.type == PhaseType.GALACTIC;
  
  return html`
    <div class="stack">
      <h1>Time Controls</h1>
      <form hx-put="${ currentPhase.toURL() }" class="grid-four">
        <button name="action" value="prev" ${{disabled: phases.at(0) == currentPhase }}>Previous Phase</button>
        ${ !currentPhase.isPlaying && html`<button name="action" value="start" >Start Phase</button>` }
        ${ currentPhase.isPlaying && html`<button name="action" value="pause" >Pause Phase</button>` }
        <button name="action" value="split" ${{disabled: !canEnterCrisisMode }}>Enter Crisis Mode</button>
        <button name="action" value="next" ${{disabled: phases.at(-1) == currentPhase }}>Next Phase</button>
      </form>
    </div>
  `
}


function PhaseTimeline({ currentPhase, phases }) {
  return html`
  <figure class="phase-timeline">
    <div class="phase-timeline__container"> 
    ${phases.map( (phase, i) => html`
      <div 
        class="phase-timeline__phase ${{
          "phase-timeline__phase--current": phase == currentPhase,
          "phase-timeline__phase--last": phase.round != phases.at(i+1)?.round
        }}" 
        data-status="${phase.status}" 
        hx-get="${ phase.toURL("/edit") }"
        hx-target="#dialog"
        style="flex-basis: ${Math.max( phase.duration, phase.timeElapsed )}px" >
        <div class="phase-timeline__bar">
          <div class="phase-timeline__phase-scheduled" style="flex-basis: ${phase.duration}px">
            <div class="phase-timeline__phase-elapsed" style="width: ${ Math.min(phase.timeElapsed / phase.duration, 1) * 100}%;"></div>
            <span class="phase-timeline__time">${ secondsToTime(phase.duration) }</span>
          </div>

          <div class="phase-timeline__phase-overflow" style="flex-basis: ${phase.timeElapsed - phase.duration}px;">
            
          </div>
        </div>

        <div class="phase-timeline__label">
          <strong>Round ${ phase.round }</strong> <br/> 
          ${ phase.type } 
        </div>
      </div>`
    )}
    </div>
  </figure>
`
}