import { html } from "#core/utils";
import Episode from "#models/episode";
import Society from "#models/society";
import Community from "#models/community";
import SocietyInfo from "./components/info.js";;

const societyPanelId = ( society ) => `society-panel-${society?.id}`;

export default function SocietyPanel({ society = new Society()} = {}) {
  const episode = Episode.load( society.episode );
  return html`
    <main id="${societyPanelId(society)}" class="content stack-loose scrollable">
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

      ${ ActionBuilder({ episode, societyId: society.id }) }

      <div class="grid-medium">
       ${society.communities.map( (community) => CommunityCard({ community }))}
      </div>

      <div class="stack-tight">
        <h3>Actions (put these in a better place)</h3>
        <div class="switch">
          <button hx-get="${episode.toURL(`/resources/create?society=${society.id}`)}" hx-target="#dialog" ${{ disabled: episode.communities.length == 0 }}>+ New Resource</button>
          <button hx-get="${episode.toURL(`/communities/create?society=${society.id}`)}" hx-target="#dialog">+ New Community</button>
          <button hx-get="${episode.toURL('/societies/create')}" hx-target="#dialog">+ New Society</button>
        </div>
      </div>
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
      >
        <header>
          <h2>
            <a hx-get="${community.toURL("/edit")}" hx-target="#dialog" hx-trigger="click">${community.name}</a></h2>
            <p class="subtitle">${community.voice}</p>
          </h2>
        </header>

        <div class="grid-three" data-sortable="resources" data-sortable-expand>
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
      <h3>${resource.name}</h3>
      <input type="hidden" name="resourceIds[]" value="${resource.id}" />
    </a>
  `;
}




export function ActionBuilder({ episode, societyId } = {}) {
  const actions = episode.actions.filter( action => action.society == societyId );

  return html`
    <section
      class="stack"
      hx-get="${episode.toURL(`/actions?societyId=${societyId}`)}"
      hx-trigger="sse:actions"
    >
      <h2>
        Actions
        <button
          name="societyId"
          value="${societyId}"
          ${{ disabled: actions.length >= 2 }}
          hx-post="${episode.toURL(`/actions`)}"
        >
          + New
        </button>
      </h2>
      ${actions.map(
        (action, i) => html`
          <div class="layout-row gap">
            <h3 data-sortable-pinned>${i + 1}: We use</h3>
            <form
              class="layout-row gap"
              data-sortable="action"
              data-sortable-allow="action, resources: clone"
              hx-post="${action.toURL("/resources")}"
              hx-trigger="sorted"
              hx-swap="none"
            >
              ${action.resources.length >= 1 &&
              ActionResourceCard({ resource: action.resources.at(0) })}

              <div class="drop drop-primary">Primary</div>

              <h3 data-sortable-pinned>We aid with</h3>

              ${action.resources.length > 1 &&
              action.resources
                .slice(1)
                .map((resource) => ActionResourceCard({ resource }))}

              <div class="drop drop-additional">Additional</div>
            </form>
          </div>
        `
      )}
    </section>

    <style>
      .drop {
        border: 2px dashed var(--color-text);
        padding: 1rem;
      }

      .drop-primary:has(+ .action-resource-card),
      .action-resource-card + .drop-primary {
        display: none;
      }

      .drop:has(+ .is-sortable-ghost),
      .is-sortable-ghost + .drop {
        display: none;
      }
    </style>
  `;
}


export function ActionResourceCard({action, resource} ){
  return html`
    <div class="action-resource-card container">
      <button type="button" class="button-close" onclick="this.nextElementSibling.remove(); this.dispatchEvent(new CustomEvent('sorted', {bubbles: true}));"></button>
      ${ CommunityResourceCard({ resource })}
    </div>
  `
}