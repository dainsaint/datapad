import Icon from "#modules/ui/icon";
import Society from "../model.js"
import { iconForArchetype } from "#core/utils";

export default function SocietyCard ({ society = new Society() } = {}) {
  return `
    <a class="card layout-row" data-id="${society.id}" hx-get="${ society.toURL('/edit')}" hx-target="#dialog">
      ${ Icon( iconForArchetype(society.archetype) ) }

      <div>
        <h2>${society.name}</h2>
        <p class="subtitle">${ society.archetype }</p>
      </div>
    </a>
  `;
}
