import { from, html } from "#core/utils";
import { ActionComponent } from "#views/actions/edit";

export default function ActionView({ action } = {}) {
  return html`
    <form class="card stack-loose color-support"
      hx-post="${action.toURL("/resources")}"
      hx-trigger="sorted,change,submit"
      hx-swap="none"
    >
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

      <fieldset class="stack-tight">
        ${ action.resources.map( (resource, i) => ActionComponent({resource, text: action.texts[i], i: i}) ) }
      </fieldset>

    </form>
  `;
}