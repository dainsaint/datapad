import { html } from "#core/utils";
import Community from "../model.js";

export default function CommunityCard({ community = new Community() } = {}) {
  return html`
    <div hx-get="${ community.toURL('/card') }" hx-trigger="sse:resources, sse:societies">
      <form 
        id="community-card-${community.id}" 
        class="card stack droppable"
        hx-patch="${ community.toURL() }"
        hx-trigger="dropcomplete"
        data-droppable="[data-drop-target]">
        <header>
          <h2><a hx-get="${ community.toURL('/edit') }" hx-target="#dialog" hx-trigger="click">${community.name}</a></h2>
          <p class="subtitle">${community.voice}</h2>
        </header>

        <div class="grid-three" data-drop-target>
          ${ community.resources.map(resource => CommunityResourceCard({ resource })) }
        </div>
      </form>
    </div>
  `;
}

export function CommunityResourceCard({ resource }) {
  return html`
    <a id="resource-card-${resource.id}" 
      class="card color-contrast" 
      draggable="true" 

      hx-get="${resource.toURL('/edit')}"
      hx-target="#dialog"
      hx-trigger="click"
      
      data-draggable="[data-droppable]"
      data-tags="${resource.tags.toList()}">
      <h3>${resource.name}</h3>
      <input type="hidden" name="resourceIds[]" value="${resource.id}"/>
    </a>
  `
}