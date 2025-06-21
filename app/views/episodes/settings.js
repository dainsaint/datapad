import { html } from "#core/utils";
import Ledger from "#database/ledger";
import { DocumentStatus } from "#models/document";
import Episode from "#models/episode";

export default function EpisodeSettings ({ episode = new Episode()} = {}) {

  const date = episode.scheduledTime.start;
  const time = episode.scheduledTime.start;
  const duration = episode.scheduledTime.toDuration("hours");
  const endTime = date.set({ hour: time.hour, minute: time.minute }).plus(duration);
  const isActiveEpisode = Ledger.active == episode.id;

  return html`
    <main class="panel content stack-loose full"
      hx-get="${episode.toURL("/settings")}"
      hx-trigger="sse:documents, sse:episode"
      hx-swap="outerHTML"
      hx-disinherit="*"
    >
      <h1>Episode Settings</h1>
      
      <div class="stack-loose">

        <div class="stack">
          <h2>Episode Details</h2>
          <div class="card color-contrast stack">
            <p class="text-heading">${ episode.name }</p>
            <p>
              This episode will take place ${date.toFormat("DDD")}
              from ${time.toFormat("h:mm a")}
              till ${endTime.toFormat("h:mm a")}.
            </p>
            <footer class="color-support layout-row gap">
              <button hx-get="${ episode.toURL("/edit")}" hx-target="#dialog"><i class="fa fa-pencil"></i> Edit Details</button>
              
              ${ !isActiveEpisode && html`<button hx-post="${ episode.toURL("/active")}" hx-target="#dialog" hx-swap="none" hx-confirm="This will set this as the active episode for ALL connected datapads!"><i class="fa fa-plug-circle-xmark"></i> Make Active Episode</button>` }
              ${ isActiveEpisode && html`<button disabled><i class="fa fa-plug-circle-check"></i> This Is The Active Episode</button>` }
              
              <div class="layout-fill"></div>
              <button hx-get="${ episode.toURL("/copy")}" hx-target="#dialog"><i class="fa fa-copy"></i> Copy From Another Episode</button>
              <button class="color-danger" hx-post="${ episode.toURL("/reset")}" hx-swap="none" hx-confirm="This will clear all actions and turns, and set all phases back to zero! (This won't clear societies, communities or resources.)"><i class="fa fa-broom"></i> Reset Episode</button>
              
            </footer>
          </div>
        </div>
  
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
                <button type="button" class="color-danger" hx-delete="${document.toURL()}" hx-confirm="Remove this document from this episode? The actual Google Doc will be fine."><i class="fa fa-trash"></i></button>
                <i class="fa fa-spinner fa-spin htmx-indicator"></i>
                ${ document.status === DocumentStatus.ERROR && html`<span><i class="fa fa-warning color-danger"></i> Error Loading</span>`}
              </formset>
          </form>
          `)}

          <form style="display: grid; grid-template-columns: 1rem 1fr 1fr 6fr 4fr; gap: 10px;"  hx-post="/documents/${episode.id}">
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