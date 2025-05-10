import { from, html } from "#core/utils";
import Society from "#models/society";
import Community from "#models/community";
import SocietyInfo from "./components/info.js";;

const societyPanelId = ( society ) => `society-panel-${society?.id}`;

export default function SocietyPanel({ society = new Society()} = {}) {
  const episode = society.episode;
  return html` <main id="${societyPanelId(society)}" class="content stack-loose scrollable" hx-get="${society.toURL("/panel")}" hx-trigger="sse:societies" hx-swap="outerHTML" hx-disinherit="hx-swap">


      <div class="grid-two">

        <div class="stack">
          <header>
            <div class="layout-row gap-tight" style="display: flex; gap: 1rem">
              <h1>
                <a hx-get="${society.toURL("/edit")}" hx-target="#dialog" hx-trigger="click">
                  ${society.name}
                </a>
              </h1>
            </div>
            ${SocietyInfo({ society })}
          </header> 

          <div class="stack">
            <h2>Communities</h2>

            <div class="grid-three gap-tight">
              ${society.communities.map( (community) => CommunityCard({ community }))}
            </div>

            <div class="layout-row gap-tight">
              <button hx-get="${episode.toURL(`/resources/create?society=${society.id}`)}" hx-target="#dialog"><i class="fa fa-cube"></i> New Resource</button>
              <button hx-get="${episode.toURL(`/communities/create?society=${society.id}`)}" hx-target="#dialog"><i class="fa fa-people-group"></i> New Community</button>
            </div>

          </div>

        </div>


       
        ${ ActionBuilder({ episode, societyId: society.id }) }

      </div>

      <footer>
        <a hx-delete="${ society.toURL() }" hx-confirm="This will PERMANENTLY delete this society!">Delete Society</a>
      </footer>
    </main>
  `;
}

export function CommunityCard({ community = new Community() } = {}) {
  return html`
    <div hx-get="${community.toURL("/card")}" hx-trigger="sse:resources, sse:societies">
      <form 
        id="community-card-${community.id}" 
        class="card stack droppable-target"
        data-sortable-bounds
        hx-post="${community.toURL("/resources")}"
        hx-trigger="sorted"
      >
        <header>
          <h2>
            <a hx-get="${community.toURL("/edit")}" hx-target="#dialog" hx-trigger="click">${community.name}</a></h2>
            <p class="subtitle">${community.voice}</p>
          </h2>
        </header>

        <div class="grid-small gap-tight" data-sortable="resources" data-sortable-expand>
          ${community.resources.map((resource) =>
            CommunityResourceCard({ resource })
          )}
          
        </div>
      </form>
    </div>
  `;
}

export function CommunityResourceCard({ resource }) {
  return html`
    <a
      id="resource-card-${resource.id}"
      class="card color-contrast resource-card"
      hx-get="${resource.toURL("/edit")}"
      hx-target="#dialog"
      hx-trigger="click"
      data-tags="${resource.tags.toList()}"
    >
      <h3>
        ${resource.name}
      </h3>
      <input type="hidden" name="resourceIds[]" value="${resource.id}" />
    </a>
  `;
}




export function ActionBuilder({ episode, societyId } = {}) {
  const actions = episode.getCurrentActionsForSocietyId( societyId );

  const action = actions[0];

  return html`
    <section class="stack" hx-get="${episode.toURL(`/actions?societyId=${societyId}`)}" hx-trigger="sse:actions">
      
      ${ action && html`
        <form class="stack-tight"
          hx-post="${action.toURL("/resources")}"
          hx-trigger="sorted,change,submit"
          hx-swap="none"
        >

          <div class="grid-two">
            <h2>Action</h2>

            <div class="layout-row gap-tight">
              <label for="risk" style="flex-basis: 100%; text-align:right;"><i class="fa fa-fire"></i> Risk Level</label>
              <select name="risk" style="flex-basis: 5rem;">
                ${ from(0).to(6).map( risk =>
                    html`<option ${{value: risk, selected: risk == action.risk }}>${risk}</option>`
                  )}
              </select>
            </div>
          </div>



          ${ action.resources.map( (resource, i) => ActionComponent({resource, text: action.texts[i], i: i}) ) }
          ${ ActionComponent({ i: action.resources.length }) }
          


          <button name="commit" value="commit" ${{ disabled: action.resources.length == 0}}><i class="fa fa-check-circle"></i> Confirm Action?</button>
        </form>
      `}
      
    </section>

    <style>
     .drop {
        border: 2px dashed var(--color-text);
        padding: 1rem;
      }
    </style>
  `;
}


export function ActionComponent({ resource, text, i } = {}) {
  return html`
    <div class="action-resources gap"

      style= "display: grid; grid-template-columns: max-content 1fr max-content 60%; align-items: center"
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
