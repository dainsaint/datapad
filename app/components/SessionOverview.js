import SocietyCard from "./SocietyCard.js";
import { secondsToTime } from "../core/utils.js";

export default function SessionOverview (session) {
  const phasesToDisplay = session.phases.slice(0,3);
  

  return `
    <main class="content grid-two" data=id="${session._id}">
      <div class="stack">
        <h1>Timeline</h1>
        <div class="grid-three">
        ${phasesToDisplay.map(PhaseCard).join("\n")}
        </div>
      </div>

      <div class="stack">
        <h1>Society Overview</h1>
        <div class="stack">
          ${session.societies.map(SocietyCard).join("\n")}

        <button>
          + Create a new society
        </button>

        </div>
      </div>
    </main>
  `;
}


function PhaseCard( phase, i ) { 
  const headings = ["Now", "Next", "Then"];
  return `
    <div class="card ${ i == 0 && 'card-fancy color-contrast'}">
      <p>${ headings[i] }</p>
      <h2>${ phase.name }</h2>
      <p>Round ${ phase.round + 1 }</p>
      <time>${ secondsToTime( phase.timeRemaining ) }</time>
    </div>
  `
}