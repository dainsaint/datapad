import { html } from "#core/utils";
import Community, { CommunityTag, CommunityVoice } from "#models/community";
import Icon from "#views/ui/icon";

export default function CommunityCard({ community = new Community() } = {}) {

  let voiceIcon = community.voice;

  if( community.isEmissary )
    voiceIcon += "-emissary";

  if( community.isAmbassador )
    voiceIcon += "-ambassador";

  return html`
    <div id="${community.id}" 
      hx-get="${community.toURL("/card")}" 
      hx-trigger="sse:resources, sse:societies"         
      hx-swap="outerHTML"
      hx-disinherit="*"
    >
      <form 
        id="community-card-${community.id}" 
        class="card card-fancy ${community.society.color} community-card community-card--${community.voice} stack-loose droppable-target"

        hx-trigger="sorted"
        hx-post="${community.toURL("/resources")}"
        hx-swap="none"
        hx-disinherit="*"

        data-sortable-bounds
      >

        <header class="community-card__header stack-tight">
          <p>
            <a class="text-heading is-uppercase" hx-get="${community.toURL("/edit")}" hx-target="#dialog" hx-trigger="click">${community.name}</a>
          </p>
          <p class="text-body is-uppercase">${ community.player }</p>
          ${ community.isAmbassador && 
            html`<p class="text"><em>Ambassador from ${ community.society.name }</em></p>`
          }
        </header>
        <div class="community-card__voice">${ Icon(voiceIcon) }</div>
        <div class="grid-small gap-tight" data-sortable="resources" data-sortable-expand hx-target="#dialog">
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
      class="card ${resource.isExhausted ? 'card-outline' : 'color-contrast'}"
      
      hx-get="${resource.toURL("/edit")}"
      
      data-tags="${resource.tags.toList()}"
    >
      <strong class="layout-row">${ resource.name }${ resource.isExhausted && html`&nbsp;&nbsp;<i class="fa fa-battery-quarter"></i>` } </strong>
      <input type="hidden" name="resourceIds[]" value="${resource.id}" />
    </a>
  `;
}

