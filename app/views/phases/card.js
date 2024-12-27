import Phase from "../../models/phase.js";
import PhaseTime from "./time.js";

export default function PhaseCard({ phase = new Phase() }, i ) { 
  const headings = ["Now", "Next", "Then"];
  return `
    <div class="card ${i == 0 ? 'card-fancy color-contrast' : 'card-transparent'} stack">
      <p class="annotation">${headings[i]}</p>
      ${ PhaseTime({ phase }) }
    </div>
  `;
}

