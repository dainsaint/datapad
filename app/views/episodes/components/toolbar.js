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
    <nav class="toolbar in-toolbar color-contrast" hx-boost="true" hx-push-url="true">
      <ul class="ribbon">
        <li><a id="nav-link-home" class="${ getActiveClass('/') }" href="/">${Icon("spop")}</a></li>
        <li><a id="nav-link-gm" class="${ getActiveClass('gm') }" href="${ episode.toURL('/gm')}">${Icon("dice")}</a></li>
        <li><a id="nav-link-facilitator" class="${ getActiveClass('facilitator') }" href="${ episode.toURL('/facilitator') }">${Icon("societal")}</a></li>
        <!--li><a id="nav-link-documents" class="${ getActiveClass('documents') }" href="${ episode.toURL('/documents') }">${Icon("script")}</a></li-->
      </ul>
    </nav>
  `;
}