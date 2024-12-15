import { map } from "../../core/utils.js";
import SocietyCard from "../societies/SocietyCard.js";
import SessionLayout from "./SessionLayout.js";
import PhaseCard from "../phases/PhaseCard.js";

export default function SessionGameMaster (session) {

  const phasesToDisplay = session.phases.slice(0,3);
  const currentPhase = phasesToDisplay.at(0);
  
  return SessionLayout(session, `
    <main class="content grid-two">
      <div class="stack">
        <h1>Timeline</h1>
        <div class="grid-three">
        ${map(phasesToDisplay, PhaseCard)}
        </div>

        <div class="stack">
          <h1>Controls (TEMP.)</h1>
          <form hx-put="${ currentPhase.toURL() }" class="grid-three">
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
          hx-get="${ session.toURL('/societies?view=create') }"
          hx-target="#app"
          hx-swap="beforeend">
          <button>+ Create a new society</button>
        </form>
      </div>
    </main>
  `);
}

export function SocietyCardList(session) {
  return `
    <div id="society-card-list" class="stack" hx-get="${ session.toURL('/societies?view=list') }" hx-trigger="sse:societies">
      ${map(session.societies, SocietyCard)}
    </div>
  `;
}