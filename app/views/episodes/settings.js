import { html } from "#core/utils";
import { DocumentStatus } from "#models/document";
import Episode from "#models/episode";

export default function EpisodeSettings ({ episode = new Episode()} = {}) {
  return html`
    <main class="panel content stack-loose full"
      hx-get="${episode.toURL("/settings")}"
      hx-trigger="sse:documents, sse:episode"
      hx-swap="outerHTML"
    >
      <h1>Episode Settings</h1>
      
      <div class="text stack-loose">
  
        <div class="stack">
          <h2>Documents</h2>
          ${ episode.documents.map( document => html`
            <form style="display: grid; grid-template-columns: 1rem 1fr 1fr 6fr 4fr; gap: 10px;" hx-post="${document.toURL()}">
              <formset>  
                <i class="fa ${document.icon || 'fa-file' }"></i>
              </formset>

              <input name="icon" value="${document.icon}" placeholder="Icon"/>
              <input name="name" value="${document.name}" placeholder="Document Name"/>
              <input name="googleDocId" value="${document.googleDocId}" placeholder="Google Doc ID"/>
              
              <formset>
                <button><i class="fa fa-check-circle"></i></button>
                <button type="button" class="color-danger" hx-delete="${document.toURL(`/${episode.id}`)}" hx-confirm="Remove this document from this episode? The actual Google Doc will be fine."><i class="fa fa-trash"></i></button>
                <i class="fa fa-spinner fa-spin htmx-indicator"></i>
                ${ document.status === DocumentStatus.ERROR && html`<span><i class="fa fa-warning color-danger"></i> Error Loading</span>`}
              </formset>
          </form>
          `)}

          <form style="display: grid; grid-template-columns: 1rem 1fr 1fr 6fr 4fr; gap: 10px;"  hx-post="${episode.toURL(`/documents`)}">
            <i class="fa fa-file"></i>

            <input name="icon"  placeholder="Icon"/>
            <input name="name"  placeholder="Name"/>
            <input name="googleDocId" placeholder="Google Doc ID"/>
            
            <formset>
              <button><i class="fa fa-file-circle-plus"></i> Add Document</button>
              <i class="fa fa-spinner fa-spin htmx-indicator"></i>
              </formset>
          </form>

        </div>

        <div class="stack">
          <h2>Links</h2>
          <form hx-put="${episode.toURL()}" hx-swap="none">
            <label for="links.discord">Discord Channel</label>
            <div class="layout-row gap">
              <input name="links[discord]" placeholder="Discord Link" value="${ episode.links.discord }"/>
              <div class="is-wide-3" >
                <button><i class="fa fa-check-circle"></i></button>
                <i class="fa fa-spinner fa-spin htmx-indicator"></i>
              </div>
            </div>
          </form>
        </div>

        <div class="stack">
          <h2>Download Data</h2>
          <ul class="text">
            <li><a href="/downloads/${ episode.id }.json" download>Download this episode (JSON)</a></li>
            <li><a href="/downloads/${ episode.id }.csv" download>Download this episode's record log (CSV)</a></li>
          </ul>
        </div>

      </div>
    </main>
  `;
}