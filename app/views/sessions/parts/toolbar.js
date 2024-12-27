import Session from "../../../models/session.js";
import { request } from "../../../server.js";
import Icon from "../../ui/icon.js";

export default function SessionToolbar({ session = new Session() } = {}) {
  const getActiveClass = (href) => {
    if( href != "/" && request.query.view == href )
      return 'active'
    else
      return '';
  }
  return `
  <nav class="toolbar color-contrast" hx-boost="true" hx-push-url="true">
    <ul class="layout-column">
      <li><a id="nav-link-home" class="${ getActiveClass('/') }" href="/">${Icon("spop")}</a></li>
      <li><a id="nav-link-gm" class="${ getActiveClass('gm') }" href="${ session.toURL('?view=gm')}">${Icon("dice")}</a></li>
      <li><a id="nav-link-facilitator" class="${ getActiveClass('facilitator') }" href="${ session.toURL('?view=facilitator') }">${Icon("societal")}</a></li>
      <li><a id="nav-link-documents" class="${ getActiveClass('documents') }" href="${ session.toURL('?view=documents') }">${Icon("script")}</a></li>
    </ul>
  </nav>
  `;
}