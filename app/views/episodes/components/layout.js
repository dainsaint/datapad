import { html } from "#core/utils";
import EpisodeStatusBar from "./statusbar.js";
import EpisodeToolbar from "./toolbar.js";

export default function EpisodeLayout({ episode }, children) {
return html`
    <section class="layout-toolbar">
      <div class="in-toolbar" hx-swap="none">
        ${EpisodeToolbar({ episode })}
      </div>

      <div class="in-statusbar">
        ${EpisodeStatusBar({ episode })}
      </div>

      <div id="main" class="in-main" hx-swap-oob="true" hx-disinherit="*">
        ${children}
      </div>
    </section>
  `;
}