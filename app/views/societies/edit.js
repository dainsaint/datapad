import { html } from "#core/utils";
import Society, {SocietyArchetype, SocietyColor} from "#models/society";
import { SocietyArchetypeInput, SocietyColorInput } from "#views/societies/create";

export default function SocietyEdit({ society = new Society() } = {}) {
  return html`
    <form class="stack-loose" hx-put="${society.toURL()}" hx-swap="none">
      <header class="stack-tight">
        <h1>Edit Society</h1>
        <div>
          <a class="color-danger" hx-delete="${ society.toURL() }" hx-confirm="This will PERMANENTLY delete this society!">
            <i class="fa fa-trash"></i> Delete Society
          </a>
        </div>
      </header>

      <fieldset>
        <label for="name">Society Name</label>
        <input name="name" autofocus autocapitalize="words" placeholder="e.g. Ten Thousand Islands" value="${society.name}"/>
      </fieldset>

      <fieldset>
        <label for="name">Society Archetype</label>
        <div class="grid-four gap-tight">
          ${Object.values(SocietyArchetype).map( archetype => SocietyArchetypeInput({ archetype, checked: society.archetype == archetype }))}
        </div>
      </fieldset>

      <fieldset>
        <label for="archetype">Society Color</label>
        <div class="grid-seven gap-tight">
          ${Object.values(SocietyColor).map( color => SocietyColorInput({ color, checked: society.color == color }))}
        </div>
      </fieldset>

      <footer class="layout-spread stack-push">
        <button type="submit"><i class="fa fa-check-circle"></i> Update Society</button>
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}