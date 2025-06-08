import { html } from "#core/utils";
import Episode from "#models/episode";
import SocietySelect from "#views/societies/select";
import SocietyView from "#views/societies/view";
import Icon from "#views/ui/icon";
import SocietyActions from "#views/societies/actions";


export default function EpisodeFacilitator ({ episode = new Episode(), societyId = undefined } = {}) {
  const society = societyId ? episode.getSocietyById( societyId ) : episode.societies.at(0);
  const turn = society.currentTurn;

  return society
    ? html`
      <main class="full layout-bottom-toolbar">
  <style>
    #facilitator {
      display: grid;
      grid-template-columns: minmax(500px, 2fr) minmax(400px, 1fr);
      gap: var(--gap);
      height: 100%;
      overflow: hidden;
    }

    @media (max-width: 1000px) {
      #facilitator {
        grid-template-columns: 1fr;
      }
    }
    </style>
        <article id="facilitator" >
          <section class="society-panel__communities panel scrollable"  style="border-top-left-radius: 0px">    
            <div class="stack" id="facilitator-society-select">
              <div hx-swap="none" hx-select-oob="#facilitator-society-view, #facilitator-action-edit, #facilitator-society-select">
                ${ SocietySelect({ society })}
              </div>

              <div class="toolbar toolbar-rounded">
                <a hx-get="${ society.toURL("/emissary")}" hx-target="#dialog">${ Icon("emissary") }</a>
              </div>

              <div class="toolbar toolbar-rounded">
                <a hx-get="${ turn.toURL("/leadership")}" hx-target="#dialog">${ Icon("leader") }</a>
              </div>

            </div>

            <div id="facilitator-society-view" class="stack">
              ${ SocietyView({ society }) }
            </div>
          </section>

          <section id="facilitator-action-edit" class="panel">
            ${ SocietyActions({ society }) }
          </section>

        </article>

        <aside class="layout-row gap-tight stack-push" hx-target="#dialog">
          <button hx-get="/communities/${episode.id}/create?societyId=${society.id}"><i class="fa fa-people-group"></i> New Community</button>
          <button hx-get="/societies/${episode.id}/create">${ Icon("planet")} New Society</button>
          <div class="layout-fill"></div>
          <button hx-get="/resources/${episode.id}/create?societyId=${society.id}"><i class="fa fa-cube"></i> New Resource</button>
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
      <button hx-get="/societies/${episode.id}/create"  hx-target="#dialog">${ Icon("planet")} New Society</button>
    </main>
  `;
}
