import { html, pluralize } from "#core/utils";
import CommunityCard from "#views/communities/card";
import Icon from "#views/ui/icon";

export default function SocietyView({ society } = {}) {
  const episode = society.episode;
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
        ${society.communities.map( (community) => CommunityCard({ community }))}
      </div>

      <div class="layout-row gap-tight stack-push">
        <button hx-get="${episode.toURL(`/resources/create?society=${society.id}`)}" hx-target="#dialog"><i class="fa fa-cube"></i> New Resource</button>
        <div class="layout-fill"></div>
        <button hx-get="${episode.toURL(`/communities/create?society=${society.id}`)}" hx-target="#dialog"><i class="fa fa-people-group"></i> New Community</button>
        <button hx-get="${episode.toURL(`/communities/create?society=${society.id}`)}" hx-target="#dialog">${ Icon("planet")} New Society</button>
      </div>
    </div>
  `
}