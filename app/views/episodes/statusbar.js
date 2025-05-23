import { html } from "#core/utils";
import Episode from "#models/episode";
import Phase from "#models/phase";
import PhaseTime from "#views/phases/time";

export default function EpisodeStatusBar ({ episode = new Episode() } = {}) {
  const activePhase = episode.currentPhase || new Phase({ name: "No Phase", round: -1, duration: 0 })

  return html`
    <nav class="status-bar color-contrast layout-row" hx-get="${episode.toURL("/statusbar")}" hx-trigger="sse:episode" hx-swap="outerHTML" >
      ${ PhaseTime({phase: activePhase}) }

      <div class="layout-row gap is-size-3">
        <a onclick="window.location.reload()" style="color: var(--color-white)">
          <i class="fa fa-refresh"></i>
        </a>

        <a href="${ episode.links.discord }" style="color: var(--color-white)">
          <i class="fab fa-discord"></i>
        </a>
        
      </div>


    </nav>
  `;
}