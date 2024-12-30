import { map, cx } from "#core/utils";
import Episode from "#models/episode";
import EpisodeLayout from "#views/episodes/parts/layout";
import PhaseCard from "#views/phases/card";
import SocietyList from "#views/societies/list";

export async function get(req) {
  const { episodeId } = req.params;
  const episode = Episode.load(episodeId);
  return { episode };
};



export default function EpisodeGameMaster ({ episode = new Episode() } = {}) {

  const phasesToDisplay = episode.phases.slice(0,3);
  const currentPhase = phasesToDisplay.at(0);
  
  const content = `
    <main class="content grid-two scrollable">
      <div class="stack">
        <h1>Timeline</h1>
        <div class="grid-three">
        ${map(phasesToDisplay, (phase, i) => PhaseCard({phase}, i))}
        </div>
      ${ currentPhase ? `
        <div class="stack">
          <h1>Controls (TEMP.)</h1>
          <form hx-put="${ currentPhase.toURL() }" class="grid-three">
            <button name="action" value="start" ${ cx({ disabled: currentPhase.isPlaying }) }>Start Current Phase</button>
            <button name="action" value="pause" ${ cx({ disabled: !currentPhase.isPlaying }) }>Pause Current Phase</button>
            <button name="action" value="stop"  ${ cx({ disabled: !currentPhase.isPlaying }) }>Complete Current Phase</button>
          </form>
        </div>` 
        : "No Phases Created yet"}
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