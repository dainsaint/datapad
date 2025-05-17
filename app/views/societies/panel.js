import { html } from "#core/utils";
import Society from "#models/society";
import SocietyInfo from "#views/societies/components/info";
import SocietySelect from "#views/societies/select";

import CommunityCard from "#views/communities/card";
import ActionEdit from "#views/actions/edit";

const societyPanelId = ( society ) => `society-panel-${society?.id}`;

export default function SocietyPanel({ society = new Society()} = {}) {
  const episode = society.episode;
  return html` <main 
    id="${societyPanelId(society)}" 
    class="society-panel"
    style="display: flex; width: 100%; height: 100%; gap: 10px;"

     hx-get="${society.toURL("/panel")}" 
     hx-trigger="sse:societies" 
     hx-disinherit="hx-swap"
    >

    <div class="society-panel__communities panel" style="flex: 1 1 auto;">
      
      <div>
        ${ SocietySelect({ episode, societyId: society.id })}
      </div>

      <div class="stack">
        <header>
          <h1><a hx-get="${society.toURL("/edit")}" hx-target="#dialog" hx-trigger="click">
            ${society.name}
          </a></h1>

          <div class="layout-row layout-spread gap-tight">
            ${SocietyInfo({ society })}

          </div>
        </header> 

        <div class="grid-three gap-tight">
          ${society.communities.map( (community) => CommunityCard({ community }))}
        </div>

        <div class="layout-row gap-tight">
          <button hx-get="${episode.toURL(`/resources/create?society=${society.id}`)}" hx-target="#dialog"><i class="fa fa-cube"></i> New Resource</button>
          <button hx-get="${episode.toURL(`/communities/create?society=${society.id}`)}" hx-target="#dialog"><i class="fa fa-people-group"></i> New Community</button>
        </div>
      </div>
    </div>

    <div class="panel">
      ${ ActionEdit({ episode, societyId: society.id }) }
    </div>

  </main>
  `;
}