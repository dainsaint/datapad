import { request } from "../../server.js";
import { iconForArchetype, map } from "../../core/utils.js";
import SocietyPanel from "../societies/panel.js";
import SessionLayout from "./parts/layout.js";
import Icon from "../ui/Icon.js";
import Session from "../../models/session.js";

export default function SessionFacilitator ({ session = new Session()} = {}) {
  const { society } = request.query;
  const currentSociety = society ? session.societies.find( x => x.id == society ) : session.societies[0];
  return SessionLayout( session, `
    <nav class="toolbar" style="background: var(--color-dark)">
      <ul class="layout-row">
        ${map(session.societies, (society) =>
          SocietyToolbarLink(society, society == currentSociety)
        )}
      </ul>
    </nav>
    ${SocietyPanel(currentSociety)}
  `
  );
}


function SocietyToolbarLink(society, isActive) {
  return `
    <li>
      <a hx-boost="true" class="${isActive ? 'active' : ''}" href="?view=facilitator&society=${society.id}">${Icon(iconForArchetype(society.archetype))}</a>
    </li>
  `;
}