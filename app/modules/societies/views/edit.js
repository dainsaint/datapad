import { map } from "#core/utils";
import Society from "#modules/societies/model";

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
  return `
    <h1>Edit Society</h1>
    <p class="text">Enter a name for this new society, and select its archetype.</p>

    <form class="stack" hx-put="${society.toURL()}" hx-swap="none">
      <label for="name">Society Name</label>
      <input autofocus name="name" placeholder="e.g. Ten Thousand Islands" value="${
        society.name
      }"/>

      <label for="archetype">Society Archetype</label>
      <select name="archetype" placeholder="Select Archetype">
      ${map(
        Object.entries(archetypes),
        ([value, text]) =>
          `<option value="${value}" ${
            society.archetype == value && "selected"
          }>${text}</option>`
      )}
      </select>

      <div class="layout-horizontal">
        <button type="submit">~ Update Society</button>
        <button type="button" value="delete" hx-delete="${society.toURL()}">x Delete Society</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
    </form>
  `;
}