import { html } from "#core/utils";
import Society from "#models/society";

const archetypes = {
  "the aesthetic": "The Aesthetic",
  "the curious": "The Curious",
  "the enterprise": "The Enterprise",
  "the faithful": "The Faithful",
  "the grounded": "The Grounded",
  "the intrepid": "The Intrepid",
  "the mighty": "The Mighty",
  "the scholars": "The Scholars",
};

export default function SocietyEdit({ society = new Society() } = {}) {
  return html`
    <h1>Edit Society</h1>
    <p class="text">Enter a name for this new society, and select its archetype.</p>

    <form class="stack" hx-put="${society.toURL()}" hx-swap="none">
      <label for="name">Society Name</label>
      <input name="name" autofocus autocapitalize="words" placeholder="e.g. Ten Thousand Islands" value="${society.name}"/>

      <label for="archetype">Society Archetype</label>
      <select name="archetype" placeholder="Select Archetype">
      ${Object.entries(archetypes).map(
        ([value, text]) =>
          html`<option value="${value}" ${{selected: society.archetype == value}}>${text}</option>`
      )}
      </select>

      <div class="layout-row gap-tight">
        <button type="submit"><i class="fa fa-check-circle"></i> Update Society</button>
        <button type="button" value="cancel">Cancel</button>
      </div>

      <footer style="text-align: right">
        <a class="color-danger" hx-delete="${ society.toURL() }" hx-confirm="This will PERMANENTLY delete this society!">
          <i class="fa fa-trash"></i> Delete Society
        </a>
      </footer>
    </form>
  `;
}