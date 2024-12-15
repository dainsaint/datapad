import LayoutToolbar from "../layouts/LayoutToolbar.js";
import Icon from "../Icon.js";
import { pluralize, iconForArchetype, map } from "../../core/utils.js";
import { request } from "../../server.js";
import CommunityCard from "../communities/CommunityCard.js";

const societyPanelId = ( society ) => `society-panel-${society?.id}`;

export default function Facilitator (session) {
  const { society } = request.query;
  const currentSociety = society ? session.societies.find( x => x.id == society ) : session.societies[0];
  return LayoutToolbar( session, `
    <nav class="toolbar" style="background: var(--color-dark)">
      <ul class="layout-row">
        ${map(session.societies, (society) =>
          SocietyToolbarLink(society, society == currentSociety)
        )}
      </ul>
    </nav>
    ${SocietyPanel(currentSociety)}
  `
  );
}


function SocietyToolbarLink(society, isActive) {
  return `
    <li>
      <a hx-boost="true" class="${isActive ? 'active' : ''}" href="?view=facilitator&society=${society.id}">${Icon(iconForArchetype(society.archetype))}</a>
    </li>
  `;
}

export function SocietyPanel( society ) {
  return `
    <main id="${societyPanelId(society)}" class="content stack">
      <header>
        <h1>${society.name}</h1>
        <p class="subtitle">
          ${society.archetype} • 
          ${society.communities.length} 
          ${pluralize(society.communities.length, "community", "communities")} • 
          ${society.getAllResources().length}
          ${pluralize(society.getAllResources().length, "resource")}
        </p>
      </header>

      <div class="grid-three">
       ${map(society.communities, CommunityCard)}
      </div>
    </main>
  `;
}

