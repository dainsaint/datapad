import Phase from "../../../models/phase.js";
import Session from "../../../models/session.js";
import PhaseTime from "../../phases/phase-time.js";


export default function SessionStatusBar ({ session = new Session() } = {}) {
  const activePhase = session?.phases?.at( session.currentRound ) || new Phase({ name: "No Phase", round: -1, duration: 0 })

  return `
  <nav class="status-bar layout-row color-contrast">
    ${ PhaseTime({phase: activePhase}) }
    <p>${ session?.game?.name }</p>
  </nav>
  `;
}