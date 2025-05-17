import { html } from "#core/utils";
import EpisodeLayout from "#views/episodes/components/layout";
import Episode from "#models/episode";
import SocietySelect from "#views/societies/select";
import SocietyView from "#views/societies/view";
import ActionEdit from "#views/actions/edit";
import Icon from "#views/ui/icon";

export default function EpisodeFacilitator ({ episode = new Episode(), societyId = undefined } = {}) {
  const society = societyId ? episode.getSocietyById( societyId ) : episode.societies.at(0);

  const content = society
    ? html`
      <main style="display: flex; width: 100%; height: 100%; gap: 10px;">
        <div class="society-panel__communities panel" style="flex: 1 1 auto;">    
          <div id="facilitator-society-select" hx-target="#facilitator-society-view">
            ${ SocietySelect({ episode, societyId: society.id })}
          </div>

          <div id="facilitator-society-view">
            ${ SocietyView({ society }) }
          </div>
        </div>

        <div id="facilitator-action-edit" class="panel">
          ${ ActionEdit({ episode, societyId: society.id }) }
        </div>
      </main>`

    : NoSocieties({ episode })

  return EpisodeLayout({ episode }, content);
}

function NoSocieties({episode}) {
  return html`
    <main class="content panel full stack">
      <h1>No Societies Yet</h1>
      <p class="text">Let's get on that.</p>
      <button hx-get="${episode.toURL('/societies/create')}" hx-target="#dialog">${ Icon("planet") } new society</button>
    </main>
  `;
}
