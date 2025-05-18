import { html } from "#core/utils";
import Episode from "#models/episode";

export default function EpisodeSettings ({ episode = new Episode()} = {}) {
  return html`
    <main class="panel content stack-loose full text">
      <h1>Episode Settings</h1>
      
  
      <div class="stack">
        <h2>Documents</h2>
        ${ episode.documents.map( document => html`
          <div class="layout-row gap">
            <input type="hidden" value="${document.id}"/>
            <input class="is-wide-3" value="${document.name}"/>
            <input value="${document.googleDocId}"/>
            <div class="is-wide-4">
              <button><i class="fa fa-check-circle"></i></button>
              <button class="color-danger"><i class="fa fa-trash"></i></button>
            </div>
          </div>
        `)}

        <form>
          <div class="layout-row gap">
            <input type="hidden" value="${episode.id}"/>
            <input class="is-wide-3"  placeholder="Document Name"/>
            <input placeholder="Google Doc ID"/>
            <div class="is-wide-4">
              <button><i class="fa fa-file-circle-plus"></i> Add Document</button>
            </div>
          </div>
        </form>
      </div>

      <div class="stack">
        <h2>Links</h2>
        <form>
          <label for="links.discord">Discord Channel</label>
          <div class="layout-row gap">
            <input name="links.discord" placeholder="Discord Link" value="${ episode.links.discord }"/>
            <div class="is-wide-3" >
              <button><i class="fa fa-check-circle"></i></button>
            </div>
          </div>
        </form>
      </div>

      <div class="stack">
        <h2>Download Data</h2>
        <ul class="text">
          <li><a href="${ episode.toURL("/download") }" download>Download this episode (JSON)</a></li>
          <li><a href="${ episode.toURL("/download/csv") }" download>Download this episode's record log (CSV)</a></li>
        </ul>
      </div>
    </main>
  `;
}