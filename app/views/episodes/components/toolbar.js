import { html } from "#core/utils";
import Episode from "#models/episode";
import Icon from "#views/ui/icon";
import { request } from "../../../app.js";


export default function EpisodeToolbar({ episode = new Episode() } = {}) {
  const getActiveClass = (href) => {
    if( href != "/" && request.path.includes(href) )
      return 'active'
    else
      return '';
  }
  return html`
    <nav class="toolbar ribbon color-contrast" hx-boost="true" hx-push-url="true">
      <a id="nav-link-home" class="${ getActiveClass('/') }" href="/">${Icon("spop")}</a>
      <a id="nav-link-gm" class="${ getActiveClass('gm') }" href="${ episode.toURL('/gm')}">${Icon("dice")}</a>
      <a id="nav-link-facilitator" class="${ getActiveClass('facilitator') }" href="${ episode.toURL('/facilitator') }">${Icon("planet")}</a>
      <a id="nav-link-settings" class="${ getActiveClass('settings') }" href="${ episode.toURL('/settings') }">${Icon("chat")}</a>
      <!-- <a id="nav-link-showrunner" class="${ getActiveClass('showrunner') }" href="${ episode.toURL('/showrunner') }">${Icon("chat")}</a> -->
    </nav>
  `;
}