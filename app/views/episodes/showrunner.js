import { html } from "#core/utils";
import PhaseControls from "#views/phases/controls";
import EpisodePlaylist from "#views/episodes/playlist";
import EpisodeSocieties from "#views/episodes/societies";

export default function EpisodeShowrunner ({ episode } = {}) {
  const currentPhase = episode.currentPhase;

  return html`
    <main class="grid-large" style="height: 100%;"
      hx-trigger="sse:episode"  
      hx-get="${ episode.toURL("/showrunner") }" 
      hx-swap="none"
      hx-select-oob="#showrunner-playlist, #showrunner-game-state"
      hx-disinherit="*"
    >
      <div id="showrunner-playlist" class="panel stack" >
        ${ currentPhase && PhaseControls({ phase: currentPhase }) }
        ${ EpisodePlaylist({ episode }) }      
      </div>

      <div id="showrunner-game-state" class="stack panel">
      <h1>Game State</h1>
      <h3></h3>

      <div class="scrollable">
        ${EpisodeSocieties({ episode })}
      </div>
      </div>
    </main>
  `;
}

