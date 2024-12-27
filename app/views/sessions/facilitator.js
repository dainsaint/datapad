import { request } from "../../server.js";
import { iconForArchetype, map } from "../../core/utils.js";
import SocietyPanel from "../societies/panel.js";
import SessionLayout from "./parts/layout.js";
import Icon from "../ui/icon.js";
import Session from "../../models/session.js";

export default function SessionFacilitator ({ session = new Session() } = {}) {
  const { society } = request.query;
  const currentSociety = society ? session.getSocietyById( society ) : session.societies.at(0);
  const content = `
    <nav class="toolbar" style="background: var(--color-dark)">
      <ul class="layout-row">
        ${map(session.societies, (society) =>
          SocietyToolbarLink(session, society, society == currentSociety)
        )}
      </ul>
    </nav>

    ${SocietyPanel({society: currentSociety})} 
  `
  return SessionLayout(session, content);
}

function SocietyToolbarLink(session, society, isActive) {
  return `
    <li>
      <a hx-boost="true" class="${isActive ? 'active' : ''}" href="${ session.toURL('?view=facilitator&society=' + society.id) }">${Icon(iconForArchetype(society.archetype))}</a>
    </li>
  `;
}