import { html } from "#core/utils";
import Episode from "#models/episode";
import SocietySelect from "#views/societies/select";
import SocietyView from "#views/societies/view";
import Icon from "#views/ui/icon";
import SocietyActions from "#views/societies/actions";

export default function EpisodeFacilitator ({ episode = new Episode(), societyId = undefined } = {}) {
  const society = societyId ? episode.getSocietyById( societyId ) : episode.societies.at(0);

  return society
    ? html`
      <main id="facilitator"  class="full" style="display: flex; gap: 10px;">
        <section class="society-panel__communities panel" style="flex: 3 1 67%;">    
          <div id="facilitator-society-select" hx-swap="none" hx-select-oob="#facilitator-society-view, #facilitator-action-edit">
            ${ SocietySelect({ society })}
          </div>

          <div id="facilitator-society-view">
            ${ SocietyView({ society }) }
          </div>
        </section>

        <section id="facilitator-action-edit" class="panel"  style="flex: 1 1 33%;">
          ${ SocietyActions({ society }) }
        </section>
      </main>`

    : NoSocieties({ episode })
}


function NoSocieties({episode}) {
  return html`
    <main id="faciliator" class="content panel full stack">
      <h1>No Societies Yet</h1>
      <p class="text">Let's get on that.</p>
      <button hx-get="${episode.toURL('/societies/create')}" hx-target="#dialog">${ Icon("planet") } new society</button>
    </main>
  `;
}
