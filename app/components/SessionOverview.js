import SocietyCard from "./SocietyCard.js";
import { secondsToTime } from "../core/utils.js";

export default function SessionOverview (session) {
  const phasesToDisplay = session.phases.slice(0,3);
  

  return `
    <main class="content grid-two">
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

        <button
          hx-get="/ui/society/create"
          hx-target="#app"
          hx-swap="beforeend"
        >+ Create a new society</button>

        </div>
      </div>
    </main>
  `;
}


function PhaseCard( phase, i ) { 
  const headings = ["Now", "Next", "Then"];
  return `
    <div class="card ${i == 0 && "card-fancy color-contrast"} stack">
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