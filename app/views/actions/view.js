import { html } from "#core/utils";
import { ActionStatus } from "#models/action";

const deco = {
  [ActionStatus.OPEN]: "card-outline",
  [ActionStatus.VOTED]: "color-white",
  [ActionStatus.INVALID]: "color-faint",
}

const icon = {
  [ActionStatus.OPEN]: "fa-comments",
  [ActionStatus.VOTED]: "fa-check-to-slot",
  [ActionStatus.INVALID]: "fa-ban",
}


export default function ActionView({ action } = {}) {

  return html`
    <form class="card stack ${deco[ action.status ]}"
      hx-post="${action.toURL("/resources")}"
      hx-trigger="sorted,change,submit"
      hx-swap="none"
    >
    <div class="layout-row gap">
      <div class="is-size-3">
        <i class="fa ${icon[ action.status ]}"></i>
      </div>

      <fieldset class="stack-tight">
        ${ action.resources.map( (resource, i) => ActionComponent({resource, text: action.texts[i], i: i}) ) }
      </fieldset>
</div>


  </form>

  `;
}


export function ActionComponent({ resource, text, i } = {}) {
  return html`
    <div 
      class="action-resources gap"
      style= "display: grid; grid-template-columns: max-content max-content max-content 1fr; align-items: center"
    >
    <p>
      We use 
      <span class="society-card__resource color-contrast">${resource.name}</span>
      to 
      <strong>${ text || ".." }.</strong>
      <input name="resourceIds[]" value="${ resource.id }" type="hidden"/>
      <input name="texts[]" value="${ text }" type="hidden"/>
    </p>

    </div>
  `
}


