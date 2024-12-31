import { map } from "#core/utils";
import Community from "#models/community";
import ResourceCard from "#views/resources/card";

export { get } from "./[id].js";

function linkTo(route) {
  return '';
}

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

// linkTo('.');
// linkTo('edit');
// linkTo("..");
// linkTo(`/resources/${resourceId}`)