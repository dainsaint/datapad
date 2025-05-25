import { html, pluralize } from "#core/utils";
import CommunityCard from "#views/communities/card";
import Icon from "#views/ui/icon";

export default function SocietyView({ society } = {}) {
  const episode = society.episode;
  const visiting = episode.societies.map( s => s.communities.filter( community => community.ambassadorSocietyId == society.id) ).flat();
  const present = society.communities.filter( community => !community.ambassadorSocietyId );

  const communities = [ ...present, ...visiting ];
  return html`
    <div 
      class="stack society-view"
      
      hx-trigger="sse:societies"
      hx-get="${ society.toURL("/view") }"         
      hx-swap="outerHTML"
      hx-disinherit="*"
      >
      <header>
        <h1><a hx-get="${society.toURL("/edit")}" hx-target="#dialog" hx-trigger="click">
          ${society.name}
        </a></h1>

        <div class="layout-row layout-spread gap-tight">
          <p class="subtitle">
            ${society.archetype} • 
            ${society.communities.length} 
            ${pluralize(society.communities.length, "community", "communities")} • 
            ${society.resources.length}
            ${pluralize(society.resources.length, "resource")}
          </p>
        </div>
      </header> 

      <div class="grid-three gap-tight">
        ${communities.map( (community) => CommunityCard({ community }))}
      </div>

    </div>
  `
}