import { map } from "../../core/utils.js";
import Community from "../../models/community.js";
import ResourceCard from "../resources/card.js";

export default function CommunityCard({ community = new Community() } = {}) {
  return `
    <div hx-get="${ community.toURL('?view=card') }" hx-trigger="sse:resources, sse:societies">
      <form 
        id="community-card-${community.id}" 
        class="card stack droppable"
        hx-patch="${ community.toURL() }"
        hx-trigger="dropcomplete"
        data-droppable="[data-drop-target]">
        <header>
          <h2><a hx-get="${ community.toURL('?view=edit') }" hx-target="#dialog" hx-trigger="click">${community.name}</a></h2>
          <p class="subtitle">${community.voice}</h2>
        </header>

        <div class="grid-three" data-drop-target>
          ${ map(community.resources, resource => ResourceCard({ resource })) }
        </div>
      </form>
    </div>
  `;
}