import { html } from "#core/utils";
import { CommunityResourceCard } from "#views/communities/card";

export default function ActionEdit({ action } = {}) {
  return html`
    <form class="card card-outline stack-loose"
      hx-post="${action.toURL("/resources")}"
      hx-trigger="sorted,change,submit"
      hx-swap="none"
    >
      <fieldset class="stack-loose">
        ${ action.resources.map( (resource, i) => ActionComponent({resource, text: action.texts[i], i: i}) ) }
        ${ ActionComponent({ i: action.resources.length }) }
      </fieldset>

      <footer class="layout-row"> 
        <div class="layout-fill"></div>
        <button name="vote" value="vote" ${{ disabled: action.resources.length == 0}}><i class="fa fa-check-to-slot"></i> Confirm Vote!</button>
      </footer>
    </form>
  `;
}


export function ActionComponent({ resource, text, i } = {}) {
  return html`
    <div 
      class="action-resources gap"
      style= "display: grid; grid-template-columns: max-content max-content 1fr; align-items: center"
    >
      <h3>We use</h3>
      
      ${ resource && ActionResourceCard({ resource }) }

      ${ !resource && html`
        <div 
          class="drop"
          data-sortable="action"
          data-sortable-allow="action, resources: clone">
            ${ i == 0 ? "Resource" : "Additional Resource" }
        </div>
      `}

      <h3>to</h3>

      <input name="texts[]" value="${ text }" placeholder="${ i == 0 ? "Take action" : "Aid action" }" style="grid-column: span 3"/>

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