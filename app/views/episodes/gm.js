import { html, secondsToTime } from "#core/utils";
import Episode from "#models/episode";
import { PhaseType } from "#models/phase";
import EpisodeLayout from "#views/episodes/components/layout";
import PhaseCard from "#views/phases/card";
import SocietyList from "#views/societies/list";
import Icon from "#views/ui/icon";
import { Duration } from "luxon";

export default function EpisodeGameMaster ({ episode } = {}) {
  // console.log( episode );
  const phasesToDisplay = episode.activePhases.slice(0,3);
  const currentPhase = episode.currentPhase;

  const rounds = episode.phases.reduce( (result, phase, i, phases ) => {
    if( i == 0 || phases[i-1].round != phase.round ) {
      result.push([])
    }
    result.at(-1).push(phase);
    return result;
  }, [])

  const totalTime = Duration.fromObject({ seconds: episode.phases.reduce ( (total, phase) => total + Math.floor( Math.max(phase.duration, phase.timeElapsed) ), 0 ) });

  const content = html`
    <main class="content stack">

      ${ Controls({ currentPhase, phases: episode.phases }) }

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





      <div class="stack">
        <h1>Timeline</h1>
        <p>${ episode.phases.length } phases<br/>${ totalTime.rescale().toHuman({ unitDisplay: "short"}) }</p>


        <div class="phase-playlist scrollable stack">
        ${ rounds.map( (round, i) => html`
          <details class="phase-playlist__round"${ currentPhase.round == i && "open" }>
            <summary class="phase-playlist__header">Round ${i}</summary>
            <ul class="phase-playlist__phases"  data-sortable="phase">
              ${ round.map( phase => html`
                <li class="phase-playlist__phase ${{ 
                  "phase-playlist__phase--current": phase == currentPhase,
                  "phase-playlist__phase--playing": phase.isPlaying,
                  "phase-playlist__phase--imminent": phase.timeElapsed >= phase.duration - 10,
                  "phase-playlist__phase--complete": phase.timeElapsed >= phase.duration,
                  "phase-playlist__phase--overtime": phase.timeElapsed > phase.duration + 10
                }}">
                  <div>${phase.type}</div>

                  <div>${secondsToTime( phase.timeElapsed ) } / ${secondsToTime( phase.duration ) } <a hx-get="${ phase.toURL("/edit") }" hx-target="#dialog">${ Icon("pencil") }</a></div>
                </li>
              `)}
            </ul>
          </details>`
        )}
        </div>




      </div>

      
      </div>
    </main>
  `;

  return EpisodeLayout({ episode }, content );
}



function Controls({ currentPhase, phases }) {
  const canEnterCrisisMode = currentPhase.isPlaying && (currentPhase.type == PhaseType.SOCIETAL  || currentPhase.type == PhaseType.GALACTIC);
  
  return html`
    <div class="stack">
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

        <button name="action" value="split" ${{disabled: !canEnterCrisisMode }}>${ Icon("lightning") } Enter Crisis Mode</button>
      </form>


    </div>
  `
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


export function PhaseTimeline({ episode, currentPhase, phases }) {
  const disp = phases.slice( phases.indexOf( currentPhase ) );

  return html`
  
    <div class="phase-timeline__container"
      hx-get="${ episode.toURL('/timeline') }"
      hx-swap="outerHTML"
      hx-trigger="sse:phases"
    > 
    ${disp.map( (phase, i) => html`
      <div 
        class="phase-timeline__phase ${{
          "phase-timeline__phase--current": phase == currentPhase,
          "phase-timeline__phase--last": phase.round != disp.at(i+1)?.round,
          "phase-timeline__phase--over": phase.timeRemaining < 0,
        }}" 
        data-status="${phase.status}" 
        hx-get="${ phase.toURL("/edit") }"
        hx-target="#dialog"
        hx-swap="innerHTML"
        style="flex-basis: ${Math.max( phase.duration, phase.timeElapsed )}px" 
        >
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
`
}
