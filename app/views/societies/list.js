import { html } from "#core/utils";
import SocietyCard from "#views/societies/card";
import Icon from "#views/ui/icon";



export default function SocietyList({ episode }) {
  const actions = episode.societies.reduce( (actions, society) => {
    actions[society.id] = episode.actions.filter( action => action.societyId == society.id && action.round == episode.currentPhase.round )
    return actions;
  }, {});
  return html`
    <div id="society-card-list" class="stack-loose" hx-get="${ episode.toURL('/societies/list') }" hx-trigger="sse:societies,sse:actions">
      ${ episode.societies.map( society => html`
        <div class="society-card stack-tight">
          <h2 class="society-card__heading gap-tight">
            <span>${ Icon.forArchetype( society.archetype ) }</span>
            <span class="society-card__heading__name">${ society.name }</span>
            <a class="society-card__edit" hx-get="${ society.toURL("/edit") }" hx-target="#dialog">${ Icon("pencil") }</a>
          </h2>
          <div class="grid-two gap-tight">
            ${ actions[society.id].map( action => html`
              <div class="society-card__action card stack-tight" data-tags="${ action.tags.toList() }">
                <p class="text">&ldquo;${ action.text.trim() || "..." }&rdquo;</p>
                <div class="society-card__resources">
                  ${ action.resources.map( x => html`<span class="society-card__resource">${x.name}</span>` ).join(" ") }
                </div>
              </div>
            `) }
          </div>
        </div>
      ` )}
    </div>
  `;
}