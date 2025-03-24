import { html } from "#core/utils";
import Phase from "#models/phase";
import Icon from "#views/ui/icon";
import PhaseTime from "./time.js";

export default function PhaseCard({ phase = new Phase(), i = 0 }) { 
  const headings = ["Now", "Next", "Then"];
  return html`
    <div class="card ${i == 0 ? 'card-fancy color-contrast' : 'card-transparent'} stack phase-card">
      <p class="annotation">${headings.at( Math.min(i, headings.length - 1))}</p>
      ${ PhaseTime({ phase }) }
      <a class="phase-card__edit" hx-get="${ phase.toURL("/edit") }" hx-target="#dialog">${ Icon("pencil") }</a>
    </div>
  `;
}

