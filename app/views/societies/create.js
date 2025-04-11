import { html } from "#core/utils";
import Episode from "#models/episode";

//figure out the society/episode jawn here...
export default function SocietyCreate({ episode = new Episode()} = {}) {
  return html`
    <h1>Create a new society</h1>
    <p class="text">Enter a name for this new society, and select its archetype.</p>

    <form class="stack" hx-post="${ episode.toURL('/societies') }" hx-swap="none">
      <input type="hidden" name="episodeId" value="${episode.id}"/>

      <label for="name">Society Name</label>
      <input name="name" placeholder="New Society" autocapitalize="words" autofocus required/>

      <label for="name">Society Archetype</label>
      <select name="archetype" placeholder="Select Archetype" >
        <option value="the aesthetic">The Aesthetic</option>
        <option value="the enterprise">The Enterprise</option>
        <option value="the faithful">The Faithful</option>
        <option value="the grounded">The Grounded</option>
        <option value="the intrepid">The Intrepid</option>
        <option value="the mighty">The Mighty</option>
        <option value="the scholars">The Scholars</option>
      </select>

      <div class="layout-row gap-tight">
        <button type="submit">+ New Society</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
    </form>
  `;
}