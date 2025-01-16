import { html } from "#core/utils";
import Phase from "#models/phase";
import PhaseTime from "./time.js";

export default function PhaseCard({ phase = new Phase(), i = 0 }) { 
  const headings = ["Now", "Next", "Then"];
  return html`
    <div class="card ${i == 0 ? 'card-fancy color-contrast' : 'card-transparent'} stack">
      <p class="annotation" hx-get="${ phase.toURL("/edit") }" hx-target="#dialog">${headings.at( Math.min(i, headings.length - 1))}</p>
      ${ PhaseTime({ phase }) }
    </div>
  `;
}

