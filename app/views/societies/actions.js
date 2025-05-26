import { html } from "#core/utils";
import { ActionStatus } from "#models/action";
import ActionEdit from "#views/actions/edit";
import ActionView from "#views/actions/view";
import { Toggle } from "#views/ui/forms";

export default function SocietyActions({ society } = {}) {
  const actions = society.episode.getCurrentActionsForSocietyId( society.id );
  const canStartNewAction = actions.length == 0 || !actions.find( action => action.status == ActionStatus.OPEN );

  return html`
    <section class="stack full" 
      hx-trigger="sse:actions"  
      hx-get="${ society.toURL("/actions") }" 
      hx-swap="outerHTML"
      hx-disinherit="*"
      >
      <h1>Actions</h1>

      <div class="stack scrollable">
        ${ actions.map( action => action.status == ActionStatus.OPEN ? ActionEdit({ action }) : ActionView({ action }))}

        ${ canStartNewAction && html`
          <form hx-post="${ society.toURL("/actions") }"class="stack-push layout-row">
            <input type="hidden" name="round" value="${society.episode.currentPhase.round}"/>
            <button><i class="fa fa-check-circle"></i> Start new action</button>
          </form>
        `}

      </div>
    </section>
  `;
}

