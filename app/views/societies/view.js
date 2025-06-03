import { html, pluralize } from "#core/utils";
import { CommunityVoice } from "#models/community";
import CommunityCard from "#views/communities/card";
import Icon from "#views/ui/icon";

export default function SocietyView({ society } = {}) {
  const episode = society.episode;
  const visiting = episode.activeCommunities.filter( community => community.isAmbassador && community.ambassadorSociety == society);
  const leaders = society.activeCommunities.filter( community => community.voice == CommunityVoice.LEADER && !community.isAmbassador );
  const people = society.activeCommunities.filter( community => community.voice == CommunityVoice.PEOPLE && !community.isAmbassador );
  const ambassadors = society.activeCommunities.filter( community => community.isAmbassador );
  const communities = [ ...leaders, ...people, ...ambassadors, ...visiting ];//.sort( (a, b) => b.resources.length - a.resources.length );

  return html`
    <div 
      class="stack society-view full"
      data-society-id="${society.id}"
      hx-trigger="sse:societies"
      hx-get="${ society.toURL("/view") }"         
      hx-swap="outerHTML"
      hx-disinherit="*"
      >
      <header class="stack-tight">
        <h1><a hx-get="${society.toURL("/edit")}" hx-target="#dialog" hx-trigger="click">
          ${society.name}
        </a></h1>

        <p class="subtitle">
          ${society.archetype} • 
          ${society.activeCommunities.length} 
          ${pluralize(society.activeCommunities.length, "community", "communities")} • 
          ${society.activeResources.length}
          ${pluralize(society.activeResources.length, "resource")}
        </p>

        <p class="text-body">
          Fate: &ldquo;${society.fate}&rdquo;
        </p>
      </header> 

      <div class="community-card-container grid-three">
        ${communities.map( (community) => CommunityCard({ community, inSociety: society }) )}
      </div>

    </div>
  `
}