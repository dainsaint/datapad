import SocietyCard from "../society/SocietyCard.js";
import { secondsToTime } from "../../core/utils.js";

export default function SessionOverview (session) {
  const phasesToDisplay = session.phases.slice(0,3);
  const phaseHeadings = ["Now", "Next", "Then"];

  return `
    <main class="session-overview main-content" data=id="${session._id}">
      <div>
        <h2>Timeline</h2>
        <div class="session-overview__timeline">
        ${ phasesToDisplay.map(
            (phase, i) => `
              <div class="session-overview__phase">
                <p>${ phaseHeadings[i] }</p>
                <h4>${ phase.name }</h4>
                <p>Round ${ phase.round + 1 }</p>
                <time>${ secondsToTime( phase.timeRemaining ) }</time>
              </div>
            `
          ).join("\n")}
        </div>
      </div>

      <div>
        <h2>Society Overview</h2>
        <div>
          ${session.societies.map( SocietyCard )}
        </div>
      </div>
    </main>
  `;
}