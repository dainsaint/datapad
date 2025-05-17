import { html } from "#core/utils";
import EpisodeStatusBar from "./statusbar.js";
import EpisodeToolbar from "./toolbar.js";

export default function EpisodeLayout({ episode }, children) {
return html`
    <section class="layout-toolbar">
      <div class="in-toolbar">
        ${EpisodeToolbar({ episode })}
      </div>

      <div class="in-statusbar">
        ${EpisodeStatusBar({ episode })}
      </div>

      <div class="in-main">
        ${children}
      </div>
    </section>
  `;
}