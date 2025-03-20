import { html } from "#core/utils";
import Episode from "#models/episode";
import { EpisodeTimeInput } from "./create.js";


export default function EpisodeEdit({ episode = new Episode() } = {}) {
  return html`
    <form hx-post="/episodes" class="stack">
      <header>
        <h1>Edit Episode</h1>
      </header>

      <article class="stack">
        <label for="name">Episode Name</label>
        <input name="name" type="text" value="${episode.name}" autofocus autocapitalize="words" required/>

        ${ EpisodeTimeInput({ 
          date: episode.scheduledTime.start,
          time: episode.scheduledTime.start,
          duration: episode.scheduledTime.toDuration("hours") }) }
      </article>

      <footer>
        <button type="submit">~ Update Episode</button>
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}