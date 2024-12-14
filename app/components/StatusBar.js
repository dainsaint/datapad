import Phase from "../models/phase.js";
import { PhaseTime } from "./PhaseCard.js";
export default function StatusBar ( session ) {
  const activePhase = session?.phases?.at( session.currentRound ) || Phase({ name: "No Phase", round: -1, duration: 0 })

  return `
  <nav class="status-bar layout-row color-contrast">
    ${ PhaseTime(activePhase) }
    <p>${ session?.game?.name }</p>
  </nav>
  `;
}