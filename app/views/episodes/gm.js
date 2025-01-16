import { html, secondsToTime } from "#core/utils";
import Episode from "#models/episode";
import EpisodeLayout from "#views/episodes/components/layout";
import PhaseCard from "#views/phases/card";
import SocietyList from "#views/societies/list";

export default function EpisodeGameMaster ({ episode = new Episode() } = {}) {
  const phasesToDisplay = episode.activePhases.slice(0,3);
  const currentPhase = episode.currentPhase;

  const content = html`

    ${ PhaseTimeline({ phases: episode.phases })}

    <main class="content grid-large gap-loose scrollable">
      <div class="stack">
        <h1>Timeline</h1>
        <div class="switch">
        ${ phasesToDisplay.map((phase, i) => PhaseCard({phase, i})) }
        </div>
      ${ currentPhase ?  PhaseControls({ phase: currentPhase }): "No Phases Created yet"}
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

function PhaseControls({ phase }) {
  console.log( phase );
  return html`
    <div class="stack">
      <h1>Controls (TEMP.)</h1>
      <form hx-put="${ phase.toURL() }" class="grid-four">
        <button name="action" value="prev">Previous Phase</button>
        ${ !phase.isPlaying && html`<button name="action" value="start" >Start Phase</button>` }
        ${ phase.isPlaying && html`<button name="action" value="pause" >Pause Phase</button>` }
        <button name="action" value="split">Split Phase</button>
        <button name="action" value="next">Next Phase</button>
        
      </form>
    </div>
  `
}


function PhaseTimeline({ phases }) {
  const colors = ["blue", "red", "green", "purple", "orange", "cyan", "magenta"]
  const totalElapsed = phases.reduce( (total, phase) => total + phase.timeElapsed, 0);
  const totalDuration = phases.reduce( (total, phase) => total + phase.duration, 0);
  let lastRound = phases.at(0)?.round;
  return html`
  <figure style="overflow-x: scroll; overflow-y: visible; max-width: 100%; height: 5rem;">
    <div style="display: flex; gap: 1px; width: 100%; padding: 1px; position: relative"> 
    ${phases.map( (phase, i) => html`
      <div style="display: flex; flex: 1 1 ${Math.max( phase.duration, phase.timeElapsed )}px; position: relative;  overflow: hidden; ${ phases.at(i+1)?.round > lastRound && (lastRound++, "border-bottom-right-radius: 15px; margin-right: 2px;")}">
        <div style="background: black; flex: 1 1 ${phase.duration}px; padding: 5px; position: relative; height: calc(1rem + 10px); overflow:hidden">
          <div style="position: absolute; top: 0px; left: 0px; height: 100%; width: ${ Math.min(phase.timeElapsed / phase.duration, 1) * 100}%; background: grey"></div>
          <span style="position: absolute; color: white; font-weight: bold; z-index: 1">${ secondsToTime(phase.duration) }</span>
        </div>

        <div style="background: red; flex: 1 1 ${phase.timeElapsed - phase.duration}px; ">
          
        </div>

        <div style="position: absolute; left: 0px; top: 100%; display: none">
          <strong>Round ${ phase.round + 1}</strong> <br/> 
          ${ phase.name } </div>
      </div>`
    )}
    </div>
  </figure>
`
}