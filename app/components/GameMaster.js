import { map } from "../core/utils.js";
import SocietyCard from "./SocietyCard.js";
import LayoutToolbar from "./LayoutToolbar.js";
import PhaseCard from "./PhaseCard.js";

export default function GameMaster (session) {
  const phasesToDisplay = session.phases.slice(0,3);
  const currentPhase = phasesToDisplay.at(0);
  
  return LayoutToolbar(session, `
    <main class="content grid-two">
      <div class="stack">
        <h1>Timeline</h1>
        <div class="grid-three">
        ${map(phasesToDisplay, PhaseCard)}
        </div>

        <div class="stack">
          <h1>Controls (TEMP.)</h1>
          <form hx-put="/session/${session._id}/phase/${currentPhase._id}" class="grid-three">
            <button name="action" value="start" ${ currentPhase.isPlaying ? "disabled" : ""}>Start Current Phase</button>
            <button name="action" value="pause" ${!currentPhase.isPlaying ? "disabled" : ""}>Pause Current Phase</button>
            <button name="action" value="stop"  ${!currentPhase.isPlaying ? "disabled" : ""}>Complete Current Phase</button>
          </form>
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