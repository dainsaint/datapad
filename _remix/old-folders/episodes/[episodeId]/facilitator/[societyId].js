import { iconForArchetype, map } from "#core/utils";
import SocietyPanel from "../societies/[societyId]/index.js";
import EpisodeLayout from "#views/episodes/parts/layout";
import Icon from "#views/ui/icon";
import Episode from "#models/episode";

export async function get(req, res) {
  const { episodeId, societyId } = req.params;
  
  const episode = Episode.load(episodeId);

  req.session.facilitator ??= {}  
  req.session.facilitator.societyId = societyId;
  return { episode, societyId }
};

export default function EpisodeFacilitator ({ episode = new Episode(), societyId = undefined } = {}) {
  const currentSociety = societyId ? episode.getSocietyById( societyId ) : episode.societies.at(0);
  const content = `
    <nav class="toolbar" style="background: var(--color-dark)">
      <ul class="layout-row" hx-boost="true">
        ${map(episode.societies, (society) =>
          SocietyToolbarLink(episode, society, society == currentSociety)
        )}
      </ul>
    </nav>

    ${SocietyPanel({society: currentSociety})} 
  `
  return content;//EpisodeLayout(episode, content);
}

function SocietyToolbarLink(episode, society, isActive) {
  return `
    <li>
      <a class="${isActive ? 'active' : ''}" href="${ episode.toURL('/facilitator/' + society.id) }">${Icon(iconForArchetype(society.archetype))}</a>
    </li>
  `;
}