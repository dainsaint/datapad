import { secondsToTime } from "../core/utils.js";
export default function StatusBar ( session ) {
  const activePhase = session.phases.at(0);

  return `
  <nav class="status-bar layout-row color-contrast">
    <time>${ secondsToTime( activePhase.timeRemaining )}</time>
    <h2>${ activePhase.name }</h2>
  </nav>
  `;
}