import { html } from "#core/utils";
import Icon from "#views/ui/icon";
import Society from "#models/society";

export default function SocietyCard ({ society = new Society() } = {}) {
  return html`
    <a class="card layout-row" data-id="${society.id}" hx-get="${ society.toURL('/edit')}" hx-target="#dialog" style="font-size: 4rem;">
      ${ Icon.forArchetype(society.archetype) }

      <div>
        <h2>${society.name}</h2>
        <p class="subtitle">${ society.archetype }</p>
      </div>
    </a>
  `;
}
