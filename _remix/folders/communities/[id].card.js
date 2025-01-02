import { map } from "#core/utils";
import Community from "#models/community";
import Resource from "#models/resource";
import { linkTo } from "../../../app/router.js";

export { get } from "./[id].js";

export default function CommunityCard({ community = new Community() } = {}) {
  return `
    <div hx-get="${ linkTo('.') }" hx-trigger="sse:resources, sse:societies">
      <form 
        id="community-card-${community.id}" 
        class="card stack droppable"
        hx-patch="${ linkTo('..') }"
        hx-trigger="dropcomplete"
        data-droppable="[data-drop-target]">

        <header>
          <h2><a hx-get="${ linkTo('edit') }" hx-target="#dialog" hx-trigger="click">${community.name}</a></h2>
          <p class="subtitle">${community.voice}</h2>
        </header>

        <div class="grid-three" data-drop-target>
          ${ map(community.resources, resource => ResourceCard({ resource })) }
        </div>

      </form>
    </div>
  `;
}

export function ResourceCard({ resource = new Resource() } = {}) {
  return `
    <a 
      id="resource-card-${resource.id}" 
      class="card color-contrast" 
      draggable="true" 

      hx-get="${`/resources/${resource.id}/edit`}"
      hx-target="#dialog"
      hx-trigger="click"
      
      data-draggable="[data-droppable]"
      data-tags="${resource.tags.toList()}" 
      >
      <h3>${resource.name}</h3>
      <input type="hidden" name="resourceIds[]" value="${resource.id}"/>
    </a> 
  `;
}