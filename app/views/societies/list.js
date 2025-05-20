import { html } from "#core/utils";

import Icon from "#views/ui/icon";



export default function SocietyList({ episode }) {
  const actions = episode.societies.reduce( (actions, society) => {
    actions[society.id] = episode.actions.filter( action => action.societyId == society.id && action.round == episode.currentPhase.round )
    return actions;
  }, {});
  return html`
    <div id="society-card-list" class="grid-two gap-loose" hx-get="${ episode.toURL('/societies/list') }" hx-trigger="sse:societies,sse:actions">
      ${ episode.societies.map( society => html`
        <div class="society-card stack-tight">
          <h2 class="society-card__heading gap-tight">
            <span>${ Icon.forArchetype( society.archetype ) }</span>
            <span class="society-card__heading__name">${ society.name }</span>
          </h2>
          <div class="grid-huge gap-tight">
            ${ actions[society.id].map( action => html`
              <div class="society-card__action card ${ action.isConfirmed ? "color-support" : "card-outline" } stack-tight" hx-get="${ action.toURL("/edit") }" hx-target="#dialog">
                
                <div class="society-card__resources stack" >

                  <div class="stack">
                    ${ action.resources.map( (x, i) => html`
                      <div>
                        We use 
                        <span hx-get="${ x.toURL("/edit") }" hx-target="#dialog" class="society-card__resource ${society.color}">${x.name}</span>
                        to 
                        <strong>${ action.texts[i] || ".." }.</strong>
                      </div>` ) }
                  </div>

                  <div>
                    <i class="fa fa-skull"></i> <strong>${action.risk}</strong>
                    <i class="fa fa-heart"></i> <strong>0</strong>
                    <i class="fa fa-heart-broken"></i> <strong>0</strong>
                  </div>

                </div>
              </div>
            `) }
          </div>
        </div>
      ` )}
    </div>
  `;
}