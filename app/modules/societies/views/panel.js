import { html } from "#core/utils";
import CommunityCard from "#modules/communities/views/card";
import Episode from "#modules/episodes/model";
import Society from "#modules/societies/model";
import SocietyInfo from "./components/info.js";

const societyPanelId = ( society ) => `society-panel-${society?.id}`;

export default function SocietyPanel({ society = new Society()} = {}) {
  const episode = Episode.load( society.episode );
  return html`
    <main id="${societyPanelId(society)}" class="content stack-loose">
      <header>
        <div class="layout-horizontal" style="display: flex; gap: 1rem">
          <h1>${society.name}</h1>

          <button hx-get="${society.toURL('/edit')}" hx-target="#dialog">Edit</button>
        </div>
        ${SocietyInfo({ society })}
      </header> 

      <div class="grid-three">
       ${society.communities.map( (community) => CommunityCard({ community }))}
      </div>

      <div class="stack-tight">
        <h3>Actions (put these in a better place)</h3>
        <div class="layout-horizontal">
          <button hx-get="${episode.toURL(`/resources/create?society=${society.id}`)}" hx-target="#dialog" ${{ disabled: episode.communities.length == 0 }}>+ New Resource</button>
          <button hx-get="${episode.toURL(`/communities/create?society=${society.id}`)}" hx-target="#dialog">+ New Community</button>
          <button hx-get="${episode.toURL('/societies/create')}" hx-target="#dialog">+ New Society</button>
        </div>
      </div>
    </main>
  `;
}

          // <h1
          //   contenteditable
          //   name="name"
          //   hx-put="${society.toURL()}"
          //   hx-trigger="blur"
          //   hx-vals="js:{name: event.target.innerHTML.trim() }"
          // >
          //   ${society.name}
          // </h1>;
