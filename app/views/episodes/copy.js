import { html } from "#core/utils";
import Ledger from "#database/ledger";
import Episode from "#models/episode";
import { EpisodeTimeInput } from "./create.js";


export default function EpisodeCopy({ episode = new Episode() } = {}) {
  const episodes = Ledger.episodes.filter( ep => ep.id !== episode.id );
  
  return html`
    <form class="stack" hx-post="${episode.toURL("/copy")}" hx-swap="none">
      <header>
        <h1>Copy From Another Episode</h1>
      </header>

      <p class="text">
        This will copy all phases, player, communities, and societies from a previous episode. <strong>This will wipe out any existing data in this episode!</strong>
      </p>

      <article class="stack">
        <label for="episodeId">Episode</label>
        <select name="episodeId">
          <option value="">-- No Episode Selected --</option>
          ${ episodes.map( episode => html`
              <option value="${episode.id}">${ episode.name }</option>
            `)}
        </select>
      </article>

      <footer>
        <button type="submit"><i class="fa fa-copy"></i> Copy Episode</button>
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}