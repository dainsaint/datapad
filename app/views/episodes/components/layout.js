import { html } from "#core/utils";
import EpisodeStatusBar from "./statusbar.js";
import EpisodeToolbar from "./toolbar.js";

export default function EpisodeLayout(episode, content) {
  return html`
    <section class="layout-toolbar">
      ${EpisodeToolbar({ episode })}
      <div class="layout-column">
        ${EpisodeStatusBar({ episode })}
        ${content}
      </div>
    </section>
  `;
}