import { html } from "#core/utils";
import ActionEdit from "#views/actions/edit";
import ActionView from "#views/actions/view";

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

      ${ actions.map( action => action.isConfirmed ? ActionView({ action }) : ActionEdit({ action }))}

      <form hx-post="${ society.toURL("/actions") }"class="stack-push layout-row">
        <input type="hidden" name="round" value="${society.episode.currentPhase.round}"/>
        <button><i class="fa fa-check-circle"></i> Start new action</button>
      </form>
    </section>
  `;
}