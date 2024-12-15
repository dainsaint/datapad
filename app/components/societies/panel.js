import { map, pluralize } from "../../core/utils.js";
import CommunityCard from "../communities/card.js";

const societyPanelId = ( society ) => `society-panel-${society?.id}`;

export function SocietyPanel( society ) {
  return `
    <main id="${societyPanelId(society)}" class="content stack">
      <header>
        <h1>${society.name}</h1>
        <p class="subtitle">
          ${society.archetype} • 
          ${society.communities.length} 
          ${pluralize(society.communities.length, "community", "communities")} • 
          ${society.getAllResources().length}
          ${pluralize(society.getAllResources().length, "resource")}
        </p>
      </header>

      <div class="grid-three">
       ${map(society.communities, CommunityCard)}
      </div>
    </main>
  `;
}