import { request } from "../../app.js";
import { iconForArchetype, map } from "../../core/utils.js";
import SocietyPanel from "../societies/panel.js";
import SessionLayout from "./parts/layout.js";
import Icon from "../ui/icon.js";
import Episode from "../../models/episode.js";

export default function SessionFacilitator ({ episode = new Episode() } = {}) {
  const { society } = request.query;
  const currentSociety = society ? episode.getSocietyById( society ) : episode.societies.at(0);
  const content = `
    <nav class="toolbar" style="background: var(--color-dark)">
      <ul class="layout-row">
        ${map(episode.societies, (society) =>
          SocietyToolbarLink(episode, society, society == currentSociety)
        )}
      </ul>
    </nav>

    ${SocietyPanel({society: currentSociety})} 
  `
  return SessionLayout(episode, content);
}

function SocietyToolbarLink(episode, society, isActive) {
  return `
    <li>
      <a hx-boost="true" class="${isActive ? 'active' : ''}" href="${ episode.toURL('?view=facilitator&society=' + society.id) }">${Icon(iconForArchetype(society.archetype))}</a>
    </li>
  `;
}