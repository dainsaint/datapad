import { html } from "#core/utils";
import PhaseControls from "#views/phases/controls";
import EpisodeSocieties from "#views/episodes/societies";
import Icon from "#views/ui/icon";

export default function EpisodeGameMaster ({ episode } = {}) {
  const currentPhase = episode.currentPhase;

  return html`
    <main class="full layout-bottom-toolbar"
      hx-trigger="sse:episode"  
      hx-get="${ episode.toURL("/gm") }" 
      hx-swap="none"
      hx-select-oob="#gm-playlist"
      hx-disinherit="*"
    >

    <article id="gm-playlist" class="panel stack" style="border-top-left-radius: 0px">
      ${ PhaseControls({ phase: currentPhase }) }
      <h1>Game State</h1>

      <div>
        ${EpisodeSocieties({ episode })}
      </div>
    </article>



    <aside class="layout-row gap-tight" hx-target="#dialog">
      <button hx-get="/communities/${episode.id}/create"><i class="fa fa-people-group"></i> New Community</button>
      <button hx-get="/societies/${episode.id}/create">${ Icon("planet")} New Society</button>
      <div class="layout-fill"></div>
      <button hx-get="/resources/${episode.id}/create"><i class="fa fa-cube"></i> New Resource</button>
    </aside>

  </main>
  `;
}

