import { html } from "#core/utils";
import PhaseControls from "#views/phases/controls";
import EpisodeSocieties from "#views/episodes/societies";
import Icon from "#views/ui/icon";

export default function EpisodeGameMaster ({ episode } = {}) {
  const currentPhase = episode.currentPhase;

  return html`
    <main class="full" style="display: grid; grid-template-rows: 1fr max-content; gap: 10px"
      hx-trigger="sse:episode"  
      hx-get="${ episode.toURL("/gm") }" 
      hx-swap="none"
      hx-select-oob="#gm-playlist"
      hx-disinherit="*"
    >
    <article class="full grid-two">
      <div id="gm-playlist" class="panel stack full" style="border-top-left-radius: 0px">
        ${ PhaseControls({ phase: currentPhase }) }
        <h1>Game State</h1>


        <div class="scrollable">
          ${EpisodeSocieties({ episode })}
        </div>
      </div>
      

    </article>


    <aside class="layout-row gap-tight stack-push" hx-target="#dialog">
      <button hx-get="/communities/${episode.id}/create"><i class="fa fa-people-group"></i> New Community</button>
      <button hx-get="/societies/${episode.id}/create">${ Icon("planet")} New Society</button>
      <div class="layout-fill"></div>
      <button hx-get="/resources/${episode.id}/create"><i class="fa fa-cube"></i> New Resource</button>
    </aside>

  </main>
  `;
}

