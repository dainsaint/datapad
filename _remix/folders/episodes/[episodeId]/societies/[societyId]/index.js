import { map } from "#core/utils";
import Society from "#models/society";
import CommunityCard from "#views/communities/card";
import SocietyInfo from "#views/societies/parts/info";

export default function SocietyPanel({ society = new Society()} = {}) {
  return `
    <main class="content stack-loose">
      <header>
        <div class="layout-horizontal" style="display: flex; gap: 1rem">
          <h1>${society.name}</h1>
          <button hx-get="${ society.toURL('/edit') }" hx-target="#dialog">Edit</button>
        </div>
        ${ SocietyInfo({ society }) }
      </header> 

      <div class="grid-three">
       ${map(society.communities, community => CommunityCard({community}) )}
      </div>

      <div class="stack-tight">
        <h3>Actions (put these in a better place)</h3>
        <div class="layout-horizontal">
          <button hx-get="${ `/episodes/${society.episode}/resources/create?society=${society.id}` }" hx-target="#dialog">+ New Resource</button>
          <button hx-get="${ `/episodes/${society.episode}/communities/create?society=${society.id}` }" hx-target="#dialog">+ New Community</button>
        </div>
      </div>
    </main>
  `;
}