import { html } from "#core/utils";
import PhaseControls from "#views/phases/controls";
import SocietyList from "#views/societies/list";
import EpisodePlaylist from "#views/episodes/playlist";
import Icon from "#views/ui/icon";

export default function EpisodeGameMaster ({ episode } = {}) {
  const currentPhase = episode.currentPhase;

  return html`
    <main class="grid-huge" style="height: 100%;"
      hx-trigger="sse:episode"  
      hx-get="${ episode.toURL("/gm") }" 
      hx-swap="none"
      hx-select-oob="#gm-playlist, #gm-game-state"
      hx-disinherit="*"
    >
      <div id="gm-playlist" class="panel stack" >
        ${ PhaseControls({ phase: currentPhase }) }
        ${ EpisodePlaylist({ episode }) }      
      </div>

      <div id="gm-game-state" class="stack panel">
        <h1>Game State</h1>

        <form class="layout-row gap-tight" hx-target="#dialog">
          <button hx-get="${ episode.toURL('/resources/create') }" ><i class="fa fa-cube"></i> new resource</button>
          <div class="layout-fill"></div>
          <button hx-get="${ episode.toURL('/societies/create') }" >${ Icon("planet") } new society</button>
          <button hx-get="${ episode.toURL('/communities/create') }" ><i class="fa fa-people-group"></i> new community</button>
        </form>

        ${SocietyList({ episode })}
      </div>
    </main>
  `;
}

