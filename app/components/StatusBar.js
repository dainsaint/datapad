import { PhaseTime } from "./PhaseCard.js";
export default function StatusBar ( session ) {
  const activePhase = session?.phases.at( session.currentRound ) || {
    timeRemaining: 0,
    name: "None",
    round: 0
  };

  return `
  <nav class="status-bar layout-row color-contrast">
    ${ PhaseTime(activePhase) }
    <p>${ session.game.name }</p>
  </nav>
  `;
}