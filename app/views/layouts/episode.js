import { html } from "#core/utils";
import EpisodeStatusBar from "../episodes/components/statusbar.js";
import EpisodeToolbar from "../episodes/components/toolbar.js";
import AppLayout from "./app.js";

export default function EpisodeLayout(props, children) {
  const layout = html`
    <section class="layout-toolbar">
      <div class="in-toolbar" hx-target="#main">
        ${EpisodeToolbar(props)}
      </div>

      <div class="in-statusbar">
        ${EpisodeStatusBar(props)}
      </div>

      <div id="main" class="in-main">
        ${children}
      </div>
    </section>
  `;

  return AppLayout(props, layout);
}