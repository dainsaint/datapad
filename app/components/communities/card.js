import { map } from "../../core/utils.js";
import Community from "../../models/community.js";
import ResourceCard from "../resources/ResourceCard.js";

export default function CommunityCard( { community = new Community() } ) {
  return `
    <div hx-get="${ community.toURL('?view=card') }" hx-trigger="sse:resources, sse:societies">
      <form id="community-card-${community.id}" class="card stack droppable" hx-patch="${ community.toURL() }" hx-trigger="dropcomplete" hx-swap="none">
        <header>
          <h2>${community.name}</h2>
          <p class="subtitle">${community.voice}</h2>
        </header>

        <div class="grid-three receivable">
          ${ map(community.resources, ResourceCard) }
        </div>
      </form>
    </div>
  `;
}

