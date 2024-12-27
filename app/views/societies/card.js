import Icon from "../ui/icon.js";
import Society from "../../models/society.js";
import { iconForArchetype } from "../../core/utils.js";

export default function SocietyCard ({ society = new Society() } = {}) {
  return `
    <div class="card layout-row" data-id="${society.id}">
      <a hx-get="${ society.toURL('?view=edit')}" hx-target="#dialog">
        ${ Icon( iconForArchetype(society.archetype) ) }
      </a>
      <div>
        <h2>${society.name}</h2>
        <p class="subtitle">${ society.archetype }</p>
      </div>
    </div>
  `;
}
