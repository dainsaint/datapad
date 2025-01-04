import { map, cx } from "#core/utils";
import CommunityCard from "#modules/communities/views/card";
import Episode from "#modules/episodes/model";
import AppLayout from "#modules/layouts/app";
import Society from "#modules/societies/model";
import SocietyInfo from "./components/info.js";

export default function SocietyEverything({ society = new Society()} = {}) {
  const episode = Episode.load( society.episode );
  const content = `
    <main class="content stack-loose">
      <header>

        <div class="layout-horizontal" style="display: flex; gap: 1rem">
          <h1 name="name" contenteditable hx-put="${ society.toURL() }" hx-trigger="blur" hx-vals="js:{name: htmx.find('[name=name]').innerHTML}">${society.name}</h1>
        </div>

        ${ SocietyInfo({ society }) }
      </header> 

      <div class="grid-three">
       ${map(society.communities, community => CommunityCard({community}) )}
      </div>

      <div class="stack-tight">
        <h3>Actions (put these in a better place)</h3>
        <div class="layout-horizontal">
          <button hx-get="${ episode.toURL(`/resources/create?society=${society.id}`) }" hx-target="#dialog" ${ cx({disabled: episode.communities.length == 0}) } >+ New Resource</button>
          <button hx-get="${ episode.toURL(`/communities/create?society=${society.id}`) }" hx-target="#dialog">+ New Community</button>
          <button hx-get="${ episode.toURL('/societies/create') }" hx-target="#dialog">+ New Society</button>
        </div>
      </div>
    </main>
  `;

  return AppLayout(content);
}