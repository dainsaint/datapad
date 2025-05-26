import { from, html } from "#core/utils";
import { ActionStatus } from "#models/action";
import { Toggle } from "#views/ui/forms";

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
    ${ action.status != ActionStatus.INVALID && html`
    <fieldset class="layout-row gap-tight">
      <label for="risk" style=""><i class="fa fa-skull"></i></label>
      <select class="is-uppercase is-size-6" name="risk" style="flex-basis: auto;">
        ${ from(0).to(6).map( risk =>
            html`<option ${{value: risk, selected: risk == action.risk }}>Risk ${risk}</option>`
          )}
      </select>

      <label for="advantage" style=""><i class="fa fa-heart"></i></label>
      <select class="is-uppercase is-size-6"  name="advantage" style="flex-basis: auto;">
        ${ from(0).to(2).map( advantage =>
            html`<option ${{value: advantage, selected: advantage == action.advantage }}>Adv ${advantage}</option>`
          )}
      </select>

      <label for="disadvantage" style=""><i class="fa fa-heart-broken"></i></label>
      <select class="is-uppercase is-size-6"  name="disadvantage" style="flex-basis: auto;">
        ${ from(0).to(2).map( disadvantage =>
            html`<option ${{value: disadvantage, selected: disadvantage == action.disadvantage }}>Dis ${disadvantage}</option>`
          )}
      </select>
    </fieldset> 
`}
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


