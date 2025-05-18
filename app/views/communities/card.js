import { html } from "#core/utils";
import Community, { CommunityVoice } from "#models/community";

export default function CommunityCard({ community = new Community() } = {}) {
  return html`
    <div hx-get="${community.toURL("/card")}" hx-trigger="sse:resources, sse:societies">
      <form 
        id="community-card-${community.id}" 
        class="card card-fancy ${ community.society.color } stack-loose droppable-target"
        data-sortable-bounds
        hx-post="${community.toURL("/resources")}"
        hx-trigger="sorted"
      >

        <header>
          <p class="text-detailing">${ community.voice }</p>
          <p>
            <a class="text-heading is-uppercase" hx-get="${community.toURL("/edit")}" hx-target="#dialog" hx-trigger="click">${community.name}</a>
          </p>
          <p class="text-body is-uppercase">Kendra (they/them)</p>
          <i class="community-card__voice fa ${community.voice == CommunityVoice.LEADER ? "fa-crown" : "fa-hand-fist"}"></i>
        </header>

        <div class="grid-small gap-tight" data-sortable="resources" data-sortable-expand 
          hx-target="#dialog"
          hx-boost="true">
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
    <a id="resource-card-${resource.id}"
      class="card color-contrast"
      href="${resource.toURL("/edit")}"
      data-tags="${resource.tags.toList()}"
    >
      <h3>${resource.name}</h3>
      <input type="hidden" name="resourceIds[]" value="${resource.id}" />
    </a>
  `;
}

