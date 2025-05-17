import { from, html } from "#core/utils";
import { CommunityResourceCard } from "#views/communities/card";

export default function ActionEdit({ action } = {}) {
  return html`
    <section class="stack" hx-get="${ action.toURL("/edit") }" hx-trigger="sse:actions">
      <form class="stack"
        hx-post="${action.toURL("/resources")}"
        hx-trigger="sorted,change,submit"
        hx-swap="none"
      >
        <h1>Action</h1>

        <div class="layout-row gap-tight">
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
        </div>

        <hr/>

        <div class="stack-tight">
          ${ action.resources.map( (resource, i) => ActionComponent({resource, text: action.texts[i], i: i}) ) }
          ${ ActionComponent({ i: action.resources.length }) }
        </div>

        <button name="commit" value="commit" ${{ disabled: action.resources.length == 0}}><i class="fa fa-check-circle"></i> Confirm Action?</button>
      </form>
    </section>

    <style>
     .drop {
        border: 2px dashed var(--palette-fg);
        padding: 1rem;
      }
    </style>
  `;
}


export function ActionComponent({ resource, text, i } = {}) {
  return html`
    <div class="action-resources gap"

      style= "display: grid; grid-template-columns: max-content max-content max-content 1fr; align-items: center"
    >
      <h3>We use</h3>
      
      ${ resource && ActionResourceCard({ resource }) }

      ${ !resource && html`<div 
        class="drop"
        data-sortable="action"
        data-sortable-allow="action, resources: clone">
          Resource
      </div>`}

      <h3>to</h3>

      <input name="texts[]" value="${ text }" placeholder="${ i == 0 ? "Take action" : "Aid action" }" style="flex-basis: 50%"/>

    </div>
  `
}

export function ActionResourceCard({resource} ){
  return html`
    <div class="action-resource-card container">
      <button type="button" class="button-close" onclick="this.nextElementSibling.remove(); this.dispatchEvent(new CustomEvent('sorted', {bubbles: true}));"></button>
      ${ CommunityResourceCard({ resource })}
    </div>
  `
}