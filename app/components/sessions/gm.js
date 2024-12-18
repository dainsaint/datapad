import { map, eachAs } from "../../core/utils.js";
import Session from "../../models/session.js";
import SessionLayout from "./parts/layout.js";
import SocietyCard from "../societies/society-card.js";
import PhaseCard from "../phases/card.js";

export default function SessionGameMaster ({ session = new Session()} = {}) {

  const phasesToDisplay = session.phases.slice(0,3);
  const currentPhase = phasesToDisplay.at(0);
  
  const content = `
    <main class="content grid-two">
      <div class="stack">
        <h1>Timeline</h1>
        <div class="grid-three">
        ${map(phasesToDisplay, eachAs("phase"), PhaseCard)}
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

        ${SocietyCardList({ session })}

        <form 
          hx-get="${ session.toURL('/societies?view=create&layout=dialog') }"
          hx-target="#app"
          hx-swap="beforeend">
          <button>+ Create a new society</button>
        </form>
      </div>
    </main>
  `;

  return SessionLayout( session, content );
}

export function SocietyCardList({ session }) {
  return `
    <div id="society-card-list" class="stack" hx-get="${ session.toURL('/societies?view=list') }" hx-trigger="sse:societies">
      ${map(session.societies, eachAs("society"), SocietyCard)}
    </div>
  `;
}