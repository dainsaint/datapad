import Icon, { iconForArchetype } from "../ui/Icon.js";

export default function SocietyCard (society) {
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
