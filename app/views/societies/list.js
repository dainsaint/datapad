import { html, pluralize } from "#core/utils";
import ActionView from "#views/actions/view";
import ActionEdit from "#views/actions/edit";

import Icon from "#views/ui/icon";
import { ActionStatus } from "#models/action";
import { DateTime } from "luxon";



export default function SocietyList({ episode }) {
  const societies = episode.societies.reduce( (societies, society) => {
    const voted = episode.getCurrentActionsForSocietyId( society.id ).find( action => action.status == ActionStatus.VOTED );
    const open = episode.getCurrentActionsForSocietyId( society.id ).find( action => action.status == ActionStatus.OPEN );
    const time = voted?.voteTime || open?.voteTime;
    const sort = voted?.voteTime?.toMillis() || 100000000000000;
    societies.push( { society, open, voted, time, sort } );
    return societies;
  }, [])

  societies.sort( (a, b) => a.sort - b.sort );

  return html`
    <div id="society-card-list" class="grid-huge gap" hx-get="${ episode.toURL('/societies/list') }" hx-trigger="sse:societies,sse:actions">
      ${ societies.map( ({society, open, voted, time}, i) => html`
        <div class="society-card card ${society.color} stack">

          <div class="layout-row layout-spread">
            <a class="text-heading" href="${ episode.toURL(`/facilitator/${society.id}`)}">
              <span class="society-card__heading__name">${i+1}) ${ society.name }</span>
            </a>

            <div class="layout-row">
              <p class="text-eyebrow">
                <span>${ Icon.forArchetype( society.archetype ) }</span>
                ${society.archetype} • 
                ${society.communities.length} 
                <i class="fa fa-people-group"></i> • 
                ${society.resources.length}
                <i class="fa fa-cube"></i>
              </p>
            </div>
          </div>

          <div class="stack-tight">
            ${ voted && ActionView({ action: voted }) }
          </div>
        </div>
      ` )}
    </div>
  `;
}





// html`
//               <div class="society-card__action card ${ action.isVoted ? "color-support" : "card-outline" } stack-tight" hx-get="${ action.toURL("/edit") }" hx-target="#dialog">
                
//                 <div class="society-card__resources stack" >

//                   <div class="stack">
//                     ${ action.resources.map( (x, i) => html`
//                       <div>
//                         We use 
//                         <span hx-get="${ x.toURL("/edit") }" hx-target="#dialog" class="society-card__resource ${society.color}">${x.name}</span>
//                         to 
//                         <strong>${ action.texts[i] || ".." }.</strong>
//                       </div>` ) }
//                   </div>

//                   <div>
//                     <i class="fa fa-skull"></i> <strong>${action.risk}</strong>
//                     <i class="fa fa-heart"></i> <strong>0</strong>
//                     <i class="fa fa-heart-broken"></i> <strong>0</strong>
//                   </div>

//                 </div>
//               </div>
//             `) 