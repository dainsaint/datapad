import { html } from "#core/utils";
import ActionEdit from "#views/actions/edit";

export default function SocietyActions({ society } = {}) {
  const actions = society.episode.getCurrentActionsForSocietyId( society.id );

  return html`
    <section class="stack" 
      hx-trigger="sse:actions"  
      hx-get="${ society.toURL("/actions") }" 
      hx-swap="outerHTML"
      hx-disinherit="*"
      >
      <h1>Actions</h1>

      ${ actions.map( action => ActionEdit({ action }))}

      <form class="stack-push layout-row">
        <button><i class="fa fa-check-circle"></i> Start new action</button>
      </form>
    </section>
  `;
}