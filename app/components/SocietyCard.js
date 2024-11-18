import Icon from "./Icon.js";

const iconForArchetype = {
  "the mighty": "mighty"
}

export default function SocietyCard (society) {
  return `
    <div class="card layout-row" data-id="${society._id}">
      ${ Icon("mighty") }
      <div>
        <h2>${society.name}</h2>
        <p>${society.archetype}</p>
      </div>
    </div>
  `;
}
