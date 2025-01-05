import { map } from "#core/utils";
import SocietyPanel from "#modules/societies/views/panel";
import EpisodeLayout from "#modules/episodes/views/components/layout";
import Episode from "#modules/episodes/model";
import Icon from "#modules/ui/icon";


export default function SessionFacilitator ({ episode = new Episode(), societyId = undefined } = {}) {
  const currentSociety = societyId ? episode.getSocietyById( societyId ) : episode.societies.at(0);
  const content = `
    <nav class="toolbar" style="background: var(--color-dark)">
      <ul class="layout-row">
        ${map(episode.societies, (society) =>
          SocietyToolbarLink(episode, society, society == currentSociety)
        )}
      </ul>
    </nav>
      
    ${ currentSociety
        ? SocietyPanel({ society: currentSociety })
        : `<main class="content stack-loose">
          <h1>No Societies Yet</h1>
          <button hx-get="${episode.toURL('/societies/create')}" hx-target="#dialog">+ Create a new society</button>
        </main>`
      } 
`

  return EpisodeLayout(episode, content);
}

function SocietyToolbarLink(episode, society, isActive) {
  return `
    <li>
      <a hx-boost="true" class="${isActive ? 'active' : ''}" href="${ episode.toURL('/facilitator/' + society.id) }">${Icon.forArchetype(society.archetype)}</a>
    </li>
  `;
}