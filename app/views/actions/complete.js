import { html } from "#core/utils";


export default function ActionComplete({ action } = {}) {
  return html`
    <form class="stack-loose"
      hx-post="${action.toURL("/resources")}"
    >
    <header>
      <h1>Complete Action Statement</h1>
</header>
      <fieldset class="stack-loose">
        ${ action.resources.map( (resource, i) => ActionCompleteComponent({resource, text: action.texts[i], i: i}) ) }
      </fieldset>

      <footer class="layout-row"> 
        <div class="layout-fill"></div>
        <button><i class="fa fa-check-to-slot"></i> Update Action</button>
      </footer>
    </form>
  `;
}


export function ActionCompleteComponent({ resource, text, i } = {}) {
  return html`
    <div 
      class="action-resources stack"
    >
    <p>
      We use 
      <span class="society-card__resource ${resource.community?.society.color}" hx-get=${ resource.toURL("/edit") } hx-target="#dialog">${resource.name}</span>
      to
    </p>
    <input name="resourceIds[]" value="${ resource.id }" type="hidden"/>
      <input name="texts[]" value="${ text }" placeholder="${ i == 0 ? "Take action" : "Aid action" }" style="grid-column: span 3"/>

    </div>
  `
}