import Episode from "../../../models/episode.js";
import { request } from "../../../app.js";
import Icon from "../../ui/icon.js";

export default function SessionToolbar({ episode = new Episode() } = {}) {
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
      <li><a id="nav-link-gm" class="${ getActiveClass('gm') }" href="${ episode.toURL('?view=gm')}">${Icon("dice")}</a></li>
      <li><a id="nav-link-facilitator" class="${ getActiveClass('facilitator') }" href="${ episode.toURL('?view=facilitator') }">${Icon("societal")}</a></li>
      <li><a id="nav-link-documents" class="${ getActiveClass('documents') }" href="${ episode.toURL('?view=documents') }">${Icon("script")}</a></li>
    </ul>
  </nav>
  `;
}