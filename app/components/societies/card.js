import Icon from "../Icon.js";
import Society from "../../models/society.js";
import { iconForArchetype } from "../../core/utils.js";


export default function SocietyCard ({ society = new Society() }) {
  return `
    <div class="card layout-row" data-id="${society.id}">
      ${ Icon( iconForArchetype(society.archetype) ) }
      <div>
        <h2>${society.name}</h2>
        <p class="subtitle">${society.archetype}</p>
      </div>
    </div>
  `;
}
