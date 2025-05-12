import { html } from "#core/utils";
import EpisodeLayout from "#views/episodes/components/layout";
import PhaseControls from "#views/phases/controls";
import SocietyList from "#views/societies/list";
import EpisodePlaylist from "#views/episodes/playlist";
import Icon from "#views/ui/icon";

export default function EpisodeGameMaster ({ episode } = {}) {
  const currentPhase = episode.currentPhase;

  const content = html`
    <main class="content stack">
      ${ PhaseControls({ phase: currentPhase }) }

      <div class="grid-two">
        <div class="stack">
          <h1>Society Overview</h1>

          <form hx-get="${ episode.toURL('/societies/create') }" hx-target="#dialog">
            <button>${ Icon("planet") } new society</button>
          </form>
          ${SocietyList({ episode })}

        </div>

        ${ EpisodePlaylist({ episode }) }      
      </div>
    </main>
  `;

  return EpisodeLayout({ episode }, content );
}

