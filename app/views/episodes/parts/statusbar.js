import Phase from "../../../models/phase.js";
import Episode from "../../../models/episode.js";
import PhaseTime from "../../phases/time.js";


export default function SessionStatusBar ({ episode = new Episode() } = {}) {
  const activePhase = episode?.phases?.at( episode.currentRound ) || new Phase({ name: "No Phase", round: -1, duration: 0 })

  return `
  <nav class="status-bar layout-row color-contrast">
    ${ PhaseTime({phase: activePhase}) }
    <p>${ episode?.game?.name }</p>
  </nav>
  `;
}