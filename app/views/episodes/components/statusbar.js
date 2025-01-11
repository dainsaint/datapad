import { html } from "#core/utils";
import Episode from "#models/episode";
import Phase from "#models/phase";
import PhaseTime from "#views/phases/time";

export default function EpisodeStatusBar ({ episode = new Episode() } = {}) {
  const activePhase = episode?.phases?.at( episode.currentRound ) || new Phase({ name: "No Phase", round: -1, duration: 0 })

  return html`
    <nav class="status-bar layout-row color-contrast">
      ${ PhaseTime({phase: activePhase}) }
    </nav>
  `;
}