import { html } from "#core/utils";
import { ActionStatus } from "#models/action";
import ActionView from "#views/actions/view";
import ActionResult from "#views/actions/result";
import TurnRisk from "#views/turns/risk";
import Icon from "#views/ui/icon";




export default function EpisodeSocieties({ episode }) {
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
    <div id="society-card-list" class="grid-large gap" hx-get="${ episode.toURL('/societies') }" style="--grid-min-width: 35rem;" hx-trigger="sse:societies,sse:actions">
      ${ societies.map( ({society, open, voted, time}, i) => html`
        <section id="${ society.id }" class="society-card card ${society.color} stack">

          
          <header class="layout-row layout-spread" style="align-items: start;">
            
            <div class="stack-tight">
              <a href="${episode.toURL(`/facilitator/${society.id}`)}" class="is-size-4">
                <strong class="society-card__heading__name">#${i+1} ${ society.name }</strong>
              </a>

              <div class="layout-row gap-tight" hx-target="#dialog">
                <div class="is-size-3">
                  <a ${{ "hx-get": society.currentEmissary?.toURL("/edit") }}>${ Icon("emissary") }</a>
                </div>
                <div>
                  <a ${{ "hx-get": society.currentEmissary?.toURL("/edit") }}>
                    <strong>${ society.currentEmissary?.name || "No Emissary"}</strong><br/>
                    ${ society.currentEmissary?.player || "Not yet elected"}<br/>
                  </a>
                </div>
              </div>
            </div>


            <div class="stack-tight align-right">
              <p class="text-eyebrow">
                <span>${ Icon.forArchetype( society.archetype ) }</span>
                ${society.archetype} • 
                ${society.communities.length} 
                <i class="fa fa-people-group"></i> • 
                ${society.resources.length}
                <i class="fa fa-cube"></i>
              </p>

              <p class="text-body">
                &ldquo;${society.fate}&rdquo;
              </p>
            </div>

          </header>

          ${ TurnRisk({ turn: society.currentTurn }) }

          


          <div class="stack-tight">
            ${ voted && ActionView({ action: voted }) }
          </div>

          

          <footer class="layout-row gap color-support">
            ${ ActionResult({ action: voted })}
            <div class="layout-fill"></div>
            <button hx-get="/resources/${episode.id}/create?societyId=${society.id}&communityId=${society.currentEmissary?.id}" hx-target="#dialog"><i class="fa fa-cube"></i> Grant Resource</button>
          </footer>
        </section>
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