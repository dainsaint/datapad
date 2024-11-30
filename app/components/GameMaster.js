import SocietyCard from "./SocietyCard.js";
import { secondsToTime, map } from "../core/utils.js";
import LayoutToolbar from "./LayoutToolbar.js";

export default function GameMaster (session) {
  const phasesToDisplay = session.phases.slice(0,3);
  
  return LayoutToolbar(session, `
    <main class="content grid-two">
      <div class="stack">
        <h1>Timeline</h1>
        <div class="grid-three">
        ${map(phasesToDisplay, PhaseCard)}
        </div>
      </div>

      <div class="stack">
        <h1>Society Overview</h1>

        ${SocietyCardList(session)}

        <form 
          hx-post="/ui/society/create"
          hx-target="#app"
          hx-swap="beforeend">
          <input type="hidden" name="session_id" value="${session._id}">
          <button>+ Create a new society</button>
        </form>
      </div>
    </main>
  `);
}

export function SocietyCardList(session) {
  return `
    <div id="society-card-list" class="stack" hx-get="/ui/society/list/${session._id}" hx-trigger="sse:societies">
      ${map(session.societies, SocietyCard)}
    </div>
  `;
}


function PhaseCard( phase, i ) { 
  const headings = ["Now", "Next", "Then"];
  return `
    <div class="card ${i == 0 ? 'card-fancy color-contrast' : 'card-transparent'} stack">
      <div class="stack-tight">
        <p class="annotation">${headings[i]}</p>
        <div>
        <h2>${phase.name}</h2>
        <p class="subtitle">Round ${phase.round + 1}</p>
        </div>
      </div>

      <time datetime="${phase.timeRemaining}s">${secondsToTime(phase.timeRemaining)}</time>
    </div>
  `;
}