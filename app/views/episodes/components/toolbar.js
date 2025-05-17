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
    <nav class="toolbar ribbon" hx-push-url="true" hx-boost="true" hx-preserve data-selectable>
      <!-- <a id="nav-link-home" class="${ getActiveClass('/') }" href="/">
        ${Icon("spop")}
      </a> -->

      <a id="nav-link-gm" class="${ getActiveClass('gm') }" href="${ episode.toURL('/gm')}">
        <span class="toolbar-link__bkg"></span>
        ${Icon("dice")}
      </a>

      <a id="nav-link-facilitator" class="${ getActiveClass('facilitator') }" href="${ episode.toURL('/facilitator') }">
        <span class="toolbar-link__bkg"></span>
        ${Icon("planet")}
      </a>

      <a id="nav-link-documents" class="${ getActiveClass('documents') }" href="${ episode.toURL('/documents') }">
        <span class="toolbar-link__bkg"></span>
        ${Icon("script")}
      </a>

      <a id="nav-link-settings" class="${ getActiveClass('settings') }" href="${ episode.toURL('/settings') }">
      <span class="toolbar-link__bkg"></span>
        ${Icon("gears")}
      </a>

      
      <!-- <a id="nav-link-showrunner" class="${ getActiveClass('showrunner') }" href="${ episode.toURL('/showrunner') }">
        ${Icon("chat")}
      </a> -->

    </nav>
  `;
}