import { html } from "#core/utils";
import Action from "#models/action";
import Episode from "#models/episode";
import Society from "#models/society";
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

      ${ ActionBuilder({ episode, society }) }

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


export function ActionBuilder({ episode, society } = {}) {
  const actions = episode.actions.filter( action => action.society == society.id );
  
  return html`
    <form hx-post="${episode.toURL(`/actions`)}">
      <input type="hidden" name="societyId" value="${society.id}"/>
      <button >+ New Action</button>
    </form>

    ${ actions.map( action => html`
      <form class="layout-row gap">
        <h2>Action</h2>
        
        <h3>We use</h3>

        <div class="card" 
          hx-patch="${ action.toURL() }" 
          hx-trigger="dropcomplete"
          data-dropeffect="link"
          data-droppable>
          //main resource  
        </div>

        <h3>We aid with</h3>

        <div class="card">
          //additional resource
        </div>
      
      </form>
    `)}
  `
}



export function CommunityCard({ community = new Community() } = {}) {
  return html`
    <div hx-get="${ community.toURL('/card') }" hx-trigger="sse:resources, sse:societies">
      <form 
        id="community-card-${community.id}" 
        class="card stack droppable"
        hx-patch="${ community.toURL() }"
        hx-trigger="dropcomplete"
        data-dropeffect="move"
        data-droppable="[data-drop-target]">
        <header>
          <h2><a hx-get="${ community.toURL('/edit') }" hx-target="#dialog" hx-trigger="click">${community.name}</a></h2>
          <p class="subtitle">${community.voice}</h2>
        </header>

        <div class="grid-three" data-drop-target>
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
      draggable="true" 

      hx-get="${resource.toURL('/edit')}"
      hx-target="#dialog"
      hx-trigger="click"
      
      data-draggable="[data-droppable]"
      data-tags="${resource.tags.toList()}">
      <h3>${resource.name}</h3>
      <input type="hidden" name="resourceIds[]" value="${resource.id}"/>
    </a>
  `
}