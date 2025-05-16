import { html } from "#core/utils";
import Episode from "#models/episode";
import Phase from "#models/phase";
import PhaseTime from "#views/phases/time";

export default function EpisodeStatusBar ({ episode = new Episode() } = {}) {
  const activePhase = episode.currentPhase || new Phase({ name: "No Phase", round: -1, duration: 0 })

  return html`
    <nav class="status-bar color-contrast layout-row">
      ${ PhaseTime({phase: activePhase}) }

      <div class="is-size-3">
        <span class="is-size-6">5:55PM</span> • 
        <a href="discord://-/channels/1063250197993492480/1063254140341473350" style="color: var(--color-white)">
          <i class="fab fa-discord"></i>
        </a>
      </div>
    </nav>
  `;
}