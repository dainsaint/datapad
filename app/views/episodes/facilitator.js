import { html } from "#core/utils";
import SocietyPanel from "#views/societies/panel";
import EpisodeLayout from "#views/episodes/components/layout";
import Episode from "#models/episode";
import Icon from "#views/ui/icon";

export default function EpisodeFacilitator ({ episode = new Episode(), societyId = undefined } = {}) {
  const currentSociety = societyId ? episode.getSocietyById( societyId ) : episode.societies.at(0);
  const content = html`
    <nav class="toolbar layout-row" style="background: var(--color-dark)">
      ${ episode.societies.map( (society) =>
        SocietyToolbarLink(episode, society, society == currentSociety)
      )}
      <button hx-get="${episode.toURL('/societies/create')}" hx-target="#dialog">+ New Society</button>
    </nav>
      
    ${ currentSociety ? SocietyPanel({ society: currentSociety }) : NoSocieties({episode}) }
  `;

  return EpisodeLayout({ episode }, content);
}

function SocietyToolbarLink(episode, society, isActive) {
  return html`
    <a hx-boost="true" class="${isActive && 'active'}" href="${ episode.toURL('/facilitator/' + society.id) }">
      ${Icon.forArchetype(society.archetype)}
    </a>
  `;
}

function NoSocieties({episode}) {
  return html`
    <main class="content stack-loose">
      <h1>No Societies Yet</h1>
      <button hx-get="${episode.toURL('/societies/create')}" hx-target="#dialog">+ Create a new society</button>
    </main>
  `;
}