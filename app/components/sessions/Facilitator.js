import LayoutToolbar from "../layouts/LayoutToolbar.js";
import Icon from "../Icon.js";
import { iconForArchetype, map } from "../../core/utils.js";
import { request } from "../../server.js";
import SocietyPanel from "../societies/panel.js";

export default function SessionFacilitator (session) {
  const { society } = request.query;
  const currentSociety = society ? session.societies.find( x => x.id == society ) : session.societies[0];
  return LayoutToolbar( session, `
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