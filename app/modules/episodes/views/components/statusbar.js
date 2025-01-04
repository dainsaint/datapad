import Episode from "#modules/episodes/model";
import Phase from "#modules/phases/model";
import PhaseTime from "#modules/phases/views/time";

export default function EpisodeStatusBar ({ episode = new Episode() } = {}) {
  const activePhase = episode?.phases?.at( episode.currentRound ) || new Phase({ name: "No Phase", round: -1, duration: 0 })

  return `
  <nav class="status-bar layout-row color-contrast">
    ${ PhaseTime({phase: activePhase}) }
    <p>${ episode?.game?.name }</p>
  </nav>
  `;
}