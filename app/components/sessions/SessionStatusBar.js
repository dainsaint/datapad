import Phase from "../../models/phase.js";
import PhaseTime from "../phases/PhaseTime.js";

export default function SessionStatusBar ( session ) {
  const activePhase = session?.phases?.at( session.currentRound ) || new Phase({ name: "No Phase", round: -1, duration: 0 })

  return `
  <nav class="status-bar layout-row color-contrast">
    ${ PhaseTime(activePhase) }
    <p>${ session?.game?.name }</p>
  </nav>
  `;
}