import { html } from "#core/utils";
import Icon from "../ui/icon.js";
import Society from "../../models/society.js"

export default function SocietyCard ({ society = new Society() } = {}) {
  return html`
    <a class="card layout-row" data-id="${society.id}" hx-get="${ society.toURL('/edit')}" hx-target="#dialog">
      ${ Icon.forArchetype(society.archetype) }

      <div>
        <h2>${society.name}</h2>
        <p class="subtitle">${ society.archetype }</p>
      </div>
    </a>
  `;
}
