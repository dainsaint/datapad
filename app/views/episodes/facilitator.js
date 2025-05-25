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
      <main class="full layout-bottom-toolbar">

        <article id="facilitator" style="display: flex; gap: var(--gap)">
          <section class="society-panel__communities panel full" style="flex: 3 1 67%;">    
            <div class="stack" id="facilitator-society-select">
              <div hx-swap="none" hx-select-oob="#facilitator-society-view, #facilitator-action-edit, #facilitator-society-select">
                ${ SocietySelect({ society })}
              </div>

              <div class="toolbar toolbar-rounded">
                <a hx-get="${ society.toURL("/emissary")}" hx-target="#dialog">${ Icon("emissary") }</a>
              </div>

              <div class="toolbar toolbar-rounded">
                <a hx-get="${ society.toURL("/ambassador")}" hx-target="#dialog">${ Icon("ambassador") }</a>
              </div>
            </div>

            <div id="facilitator-society-view" class="stack">
              ${ SocietyView({ society }) }
            </div>
          </section>

          <section id="facilitator-action-edit" class="panel"  style="flex: 1 1 33%;">
            ${ SocietyActions({ society }) }
          </section>

        </article>

        <aside class="layout-row gap-tight stack-push">
          <button hx-get="${episode.toURL(`/resources/create?society=${society.id}`)}" hx-target="#dialog"><i class="fa fa-cube"></i> New Resource</button>
          <div class="layout-fill"></div>
          <button hx-get="${episode.toURL(`/communities/create?society=${society.id}`)}" hx-target="#dialog"><i class="fa fa-people-group"></i> New Community</button>
          <button hx-get="${episode.toURL(`/societies/create`)}" hx-target="#dialog">${ Icon("planet")} New Society</button>
        </aside>
      </main>
      
      `

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
