import LayoutToolbar from "./LayoutToolbar.js";
import Icon from "./Icon.js";
import { pluralize, iconForArchetype, map } from "../core/utils.js";


const societyPanelId = ( society ) => `society-panel-${society?._id}`;

export default function Facilitator (session) {
  return LayoutToolbar(session, `
    <nav class="toolbar" style="background: var(--color-dark)">
      <ul class="layout-row">
        ${ map( session.societies, SocietyToolbarLink ) }
      </ul>
    </nav>

    ${ map( session.societies, SocietyPanel ) }
    
    <script>
      if(!window.location.hash) {
        if(!localStorage.getItem("society-hash"))
          localStorage.setItem("society-hash", "#society-panel-${societyPanelId( session.societies?.at(0))}");

        window.location.hash = localStorage.getItem("society-hash");
      }

      document.querySelectorAll(".js-society-toolbar-link").forEach( link => {
        link.onclick = () => localStorage.setItem("society-hash", link.getAttribute("href"))
      })
    </script>
  `);
}

function SocietyToolbarLink(society) {
  return `
    <li>
      <a class="active-target js-society-toolbar-link" href="#${societyPanelId(society)}">${Icon(iconForArchetype(society.archetype))}</a>
    </li>
  `;
}

function SocietyPanel( society ) {
  return `
    <main id="${societyPanelId(society)}" class="content stack hidden target-visible">
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

function CommunityCard( community ) {
  return `
     <div class="card stack">
      <header>
        <h2>${community.name}</h2>
        <p class="subtitle">${community.voice}</h2>
      </header>
      <div class="grid-three">
        ${ map( community.resources, ResourceCard) }
      </div>
    </div>
  `;
}

function ResourceCard( resource ) {
  return `
    <div class="card color-contrast">
      <h3>${resource.name}</h3>
    </div>
  `;
}