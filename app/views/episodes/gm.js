import { html } from "#core/utils";
import Episode from "#modules/episodes/model";
import EpisodeLayout from "#modules/episodes/views/components/layout";
import PhaseCard from "#modules/phases/views/card";
import SocietyList from "#modules/societies/views/list";

export default function EpisodeGameMaster ({ episode = new Episode() } = {}) {
  const phasesToDisplay = episode.phases.slice(0,3);
  const currentPhase = phasesToDisplay.at(0);
  
  const content = html`
    <main class="content grid-two scrollable">
      <div class="stack">
        <h1>Timeline</h1>
        <div class="grid-three">
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

  return EpisodeLayout( episode, content );
}

function PhaseControls({ phase }) {
  return html`
    <div class="stack">
      <h1>Controls (TEMP.)</h1>
      <form hx-put="${ phase.toURL() }" class="grid-three">
        <button name="action" value="start" ${{ disabled: phase.isPlaying }}>Start Current Phase</button>
        <button name="action" value="pause" ${{ disabled: !phase.isPlaying }}>Pause Current Phase</button>
        <button name="action" value="stop"  ${{ disabled: !phase.isPlaying }}>Complete Current Phase</button>
      </form>
    </div>
  `
}