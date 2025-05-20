import { html } from "#core/utils";
import PhaseControls from "#views/phases/controls";
import EpisodePlaylist from "#views/episodes/playlist";

export default function EpisodeShowrunner ({ episode } = {}) {
  const currentPhase = episode.currentPhase;

  return html`
    <main class="grid-huge" style="height: 100%;"
      hx-trigger="sse:episode"  
      hx-get="${ episode.toURL("/showrunner") }" 
      hx-swap="none"
      hx-select-oob="#showrunner-playlist"
      hx-disinherit="*"
    >
      <div id="showrunner-playlist" class="panel stack" >
        ${ PhaseControls({ phase: currentPhase }) }
        ${ EpisodePlaylist({ episode }) }      
      </div>

      <div class="stack panel">

      </div>
    </main>
  `;
}

