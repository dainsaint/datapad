import { html, pluralize } from "#core/utils";
import CommunityCard from "#views/communities/card";
import Icon from "#views/ui/icon";

export default function SocietyView({ society } = {}) {
  const episode = society.episode;
  const visiting = episode.societies.map( s => s.communities.filter( community => community.ambassadorSocietyId == society.id) ).flat();
  const communities = [ ...society.communities, ...visiting ].sort( (a, b) => b.resources.length - a.resources.length );
  return html`
    <div 
      class="stack society-view full"
      data-society-id="${society.id}"
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

      <div class="community-card-container" style="overflow: auto">
        ${communities.map( (community) => CommunityCard({ community, inSociety: society }) )}
      </div>

      <style>
        /* .community-card-container {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          gap: var(--gap);
          max-height: 700px;
        }
        .community-card-container > * {
          /* flex: 1 1 400px; 
          width: 33%;
          border: 1px solid red;
        } */
        .community-card-container > * {
          float: left;
          width: calc((98% - 22px)/3);
          min-width: 200px;
          margin-right: 10px;
          margin-bottom: 10px;
        }
        
      </style>

    </div>
  `
}