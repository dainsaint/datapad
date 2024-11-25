import { secondsToTime } from "../core/utils.js";
export default function StatusBar ( session ) {
  const activePhase = session?.phases.at( session.currentRound ) || {
    timeRemaining: 0,
    name: "None",
    round: 0
  };

  return `
  <nav class="status-bar layout-row color-contrast">
    <time datetime="${activePhase.timeRemaining}s" >${secondsToTime(activePhase.timeRemaining)}</time>
    <div>
      <h2>${activePhase.name}</h2>
      <p class="subtitle">Round ${ activePhase.round + 1}</p>
    </div>
    <p>${ session.game.name }</p>
  </nav>
  `;
}