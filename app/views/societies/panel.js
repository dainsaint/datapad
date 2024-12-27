import { map } from "../../core/utils.js";
import Episode from "../../models/episode.js";
import Society from "../../models/society.js";
import CommunityCard from "../communities/card.js";
import SocietyInfo from "./parts.js/info.js";

const societyPanelId = ( society ) => `society-panel-${society?.id}`;

export default function SocietyPanel({ society = new Society()} = {}) {
  const episode = Episode.load( society.episode );
  return `
    <main id="${societyPanelId(society)}" class="content stack-loose">
      <header>
        <h1>${society.name}</h1>
        ${ SocietyInfo({ society }) }
      </header>

      <div class="grid-three">
       ${map(society.communities, community => CommunityCard({community}) )}
      </div>

      <div class="stack-tight">
        <h3>Actions (put these in a better place)</h3>
        <div class="layout-horizontal">
          <button hx-get="${ society.toURL('?view=edit') }" hx-target="#dialog">~ Edit Society</button>
          <button hx-get="${ episode.toURL('/resources/?view=create') }" hx-target="#dialog">+ New Resource</button>
          <button hx-get="${ episode.toURL('/communities/?view=create') }" hx-target="#dialog">+ New Community</button>
        </div>
      </div>
    </main>
  `;
}