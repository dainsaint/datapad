import LayoutToolbar from "./LayoutToolbar.js";
import Icon from "./Icon.js";
import { pluralize, iconForArchetype, map } from "../core/utils.js";


const societyPanelId = ( society ) => `society-panel-${society?._id}`;

export default function Facilitator (session, currentSociety) {
  return LayoutToolbar( session, `
    <nav class="toolbar" style="background: var(--color-dark)">
      <ul class="layout-row">
        ${map(session.societies, (society) =>
          SocietyToolbarLink(society, society == currentSociety)
        )}
      </ul>
    </nav>
    
    ${SocietyPanel(session, currentSociety)}
  `
  );
}

function SocietyToolbarLink(society, isActive) {
  return `
    <li>
      <a hx-boost="true" class="${isActive ? 'active' : ''}" href="/facilitator/${society._id}">${Icon(iconForArchetype(society.archetype))}</a>
    </li>
  `;
}

export function SocietyPanel( session, society ) {
  return `
    <main id="${societyPanelId(society)}" class="content stack">
      <header>
        <h1>${society.name}</h1>
        <p class="subtitle">
          ${society.archetype} • 
          ${society.communities.length} 
          ${pluralize(society.communities.length, "community", "communities")} • 
          ${society.resources.length}
          ${pluralize(society.resources.length, "resource")}
        </p>
      </header>

      <div class="grid-three">
       ${map(society.communities, CommunityCard)}
      </div>
    </main>
  `;
}

export function CommunityCard(  community ) {
  return `
    <div hx-get="/ui/community/card/${community._id}" hx-trigger="sse:resources, sse:societies">
      <form id="community-card-${community._id}" class="card stack droppable" hx-patch="/community/${community._id}" hx-trigger="dropcomplete" hx-swap="none">
        <header>
          <h2>${community.name}</h2>
          <p class="subtitle">${community.voice}</h2>
        </header>

        <div class="grid-three receivable">
          ${ map( community.resources, ResourceCard) }
        </div>
      </form>
    </div>
  `;
}

export function ResourceCard( resource ) {
  return `
    <div id="resource-card-${resource._id}" class="card color-contrast draggable" draggable="true" data-exhausted="${resource.isExhausted}">
      <h3>${resource.name}</h3>
      <input type="hidden" name="resource_ids[]" value="${resource._id}"/>
    </div>
  `;
}

        // <input type="hidden" name="session_id" value="${session._id}"/>
        // <input type="hidden" name="ui" value="/ui/community/card/${session._id}/${community._id}"/>