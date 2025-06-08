import { html } from "#core/utils";
import Community, { CommunityTag, CommunityVoice } from "#models/community";
import { TurnOverrideVoice } from "#models/turn";
import Icon from "#views/ui/icon";

export default function CommunityCard({ community = new Community(), inSociety } = {}) {

  const turn = community.society.currentTurn;
  const turnVoice = turn.alterLeadership[community.id];
  const voice = (turnVoice && turnVoice != TurnOverrideVoice.NONE) ? turnVoice : community.voice;

  let voiceIcon = voice;

  const cardClasses = [];

  if( community.isEmissary ) {
    voiceIcon += "-emissary";
    cardClasses.push( "community-card--is-emissary");
  }

  if( community.isAmbassador ) {
    voiceIcon += "-ambassador";
    cardClasses.push( "community-card--is-ambassador");
  }

  return html`
    <div id="${community.id}" 
      hx-get="${community.toURL("/card")}" 
      hx-trigger="sse:resources, sse:societies"         
      hx-swap="outerHTML"
      hx-disinherit="*"
    >
      <form 
        id="community-card-${community.id}" 
        class="card card-fancy community-card ${community.society.color} community-card--${voice} ${ cardClasses } stack-loose droppable-target js-community-card"
        data-society-id="${community.society.id}"
        hx-trigger="sorted"
        hx-post="${community.toURL("/resources")}"
        hx-swap="none"
        hx-disinherit="*"
        data-tags="${ community.tags.toList() }"
        data-sortable-bounds
      >

        <header class="community-card__header">
          <p class="is-size-7">${ voice } ${ community.isEmissary && "• emissary"} ${ community.isAmbassador && "• ambassador"}</p></p>
          <strong>
            ${ community.resources.length == 0 && html`<i class="fa fa-warning"></i> ` }<a class="is-uppercase is-size-5" hx-get="${community.toURL("/edit")}" hx-target="#dialog" hx-trigger="click">${community.name}</a>
          </strong>
          <p class="text-body is-uppercase">${ community.player }</p>
          ${ community.isAmbassador && 
            html`<p class="text">
              <em class="community-card__ambassador-from">Ambassador from ${ community.society.name }</em>
              <em class="community-card__ambassador-to">Visiting ${ community.ambassadorSociety.name }</em>
            </em></p>`
          }
        </header>

        <div class="community-card__voice">${ Icon(voiceIcon) }</div>

        <div class="community-card__resources grid-small gap-tight" data-sortable="resources" data-sortable-expand hx-target="#dialog">
          ${community.activeResources.map((resource) =>
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

