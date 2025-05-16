import { html } from "#core/utils";
import Episode from "#models/episode";
import Icon from "#views/ui/icon";

export default function SocietySelect ({ episode = new Episode(), societyId = undefined } = {}) {
  const currentSociety = societyId ? episode.getSocietyById( societyId ) : episode.societies.at(0);
  return html`
    <nav class="toolbar">
      ${ episode.societies.map( (society) =>
        SocietyToolbarLink(episode, society, society == currentSociety)
      )}
    </nav>
  `;
}

function SocietyToolbarLink(episode, society, isActive) {
  return html`
    <a hx-boost="true" class="${isActive && 'active'}" href="${ episode.toURL('/facilitator/' + society.id) }">
      ${Icon.forArchetype(society.archetype)}
    </a>
  `;
}