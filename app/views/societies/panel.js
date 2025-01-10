import { html } from "#core/utils";
import Action from "#models/action";
import Episode from "#models/episode";
import Society from "#models/society";
import Community from "#models/community";
import SocietyInfo from "./components/info.js";;

const societyPanelId = ( society ) => `society-panel-${society?.id}`;

export default function SocietyPanel({ society = new Society()} = {}) {
  const episode = Episode.load( society.episode );
  return html`
    <main id="${societyPanelId(society)}" class="content stack-loose">
      <header>
        <div class="layout-row gap-tight" style="display: flex; gap: 1rem">
          <h1>${society.name}</h1>

          <button hx-get="${society.toURL('/edit')}" hx-target="#dialog">Edit</button>
        </div>
        ${SocietyInfo({ society })}
      </header> 

      ${ ActionBuilder({ episode, societyId: society.id }) }

      <div class="grid-three">
       ${society.communities.map( (community) => CommunityCard({ community }))}
      </div>

      <div class="stack-tight">
        <h3>Actions (put these in a better place)</h3>
        <div class="layout-row gap-tight">
          <button hx-get="${episode.toURL(`/resources/create?society=${society.id}`)}" hx-target="#dialog" ${{ disabled: episode.communities.length == 0 }}>+ New Resource</button>
          <button hx-get="${episode.toURL(`/communities/create?society=${society.id}`)}" hx-target="#dialog">+ New Community</button>
          <button hx-get="${episode.toURL('/societies/create')}" hx-target="#dialog">+ New Society</button>
        </div>
      </div>
    </main>
  `;
}


export function ActionBuilder({ episode, societyId } = {}) {
  const actions = episode.actions.filter( action => action.society == societyId );

  return html`
    <section
      class="action-builder stack"
      hx-get="${episode.toURL(`/actions?societyId=${societyId}`)}"
      hx-trigger="sse:actions"
    >
      <h2>
        Actions
        <button 
          name="societyId"
          value="${societyId}" 
          ${{ disabled: actions.length >= 2 }}
          hx-post="${episode.toURL(`/actions`)}">+ New</button>
      </h2>
      ${actions.map(
        (action, i) => html`
          <form
            class="layout-column layout-row gap"
            data-sortable="action"
            data-sortable-allow="action, resources: clone"
            hx-post="${action.toURL("/resources")}"
            hx-trigger="sorted"
            hx-swap="none"
          >
            <h3 data-sortable-pinned>${i + 1}: We use</h3>

            ${action.resources.length >= 1
              ? CommunityResourceCard({ resource: action.resources.at(0) })
              : html`<span>//primary</span>`}

            <h3 data-sortable-pinned>We aid with</h3>

            ${action.resources.length > 1
              ? action.resources
                  .slice(1)
                  .map((resource) => CommunityResourceCard({ resource }))
              : html`<span>//addtl</span>`}
          </form>
        `
      )}
    </section>
  `;
}



export function CommunityCard({ community = new Community() } = {}) {
  return html`
    <div hx-get="${ community.toURL('/card') }" hx-trigger="sse:resources, sse:societies">
      <form 
        id="community-card-${community.id}" 
        class="card stack droppable"
        hx-patch="${ community.toURL() }"
      >
        <header>
          <h2><a hx-get="${ community.toURL('/edit') }" hx-target="#dialog" hx-trigger="click">${community.name}</a></h2>
          <p class="subtitle">${community.voice}</h2>
        </header>

        <div class="grid-three" data-sortable="resources">
          ${ community.resources.map(resource => CommunityResourceCard({ resource })) }
        </div>
      </form>
    </div>
  `;
}

export function CommunityResourceCard({ resource }) {
  return html`
    <a id="resource-card-${resource.id}" 
      class="card color-contrast" 
      hx-get="${resource.toURL('/edit')}"
      hx-target="#dialog"
      hx-trigger="click"
      data-tags="${resource.tags.toList()}">
      <h3>${resource.name}</h3>
      <input type="hidden" name="resourceIds[]" value="${resource.id}"/>
    </a>
  `
}

export function Deleteable({ content }) {
  return html`
    <div class="deletable">
      x
      ${ content }
    </div>
  `;
}


            // hx-post="${action.toURL("/primary")}"
            // hx-trigger="sorted"
            // hx-target="#action-builder"
            // hx-swap="outerHTML"


export function Test() {
return html`
  <form class="grid-two">
    <fieldset>
      <legend>Primary Resource</legend>
      <label for="primary">None</label>
      <input type="radio" name="primary" value="" />

      <label for="primary">Resource 1</label>
      <input type="radio" name="primary" value="93n7ahr" />

      <label for="primary">Resource 2</label>
      <input type="radio" name="primary" value="jhd27bd" />

      <label for="primary">Resource 3</label>
      <input type="radio" name="primary" value="8723hda" />
    </fieldset>

    <fieldset>
      <legend>Additional Resources</legend>
      <label for="primary">Resource 1</label>
      <input type="checkbox" name="primary" value="93n7ahr" />

      <label for="primary">Resource 2</label>
      <input type="checkbox" name="primary" value="jhd27bd" />

      <label for="primary">Resource 3</label>
      <input type="checkbox" name="primary" value="8723hda" />
    </fieldset>
  </form>
`;
}