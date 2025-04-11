import { html } from "#core/utils";
import Episode from "#models/episode";
import EpisodeLayout from "./components/layout.js";

export default function EpisodeSettings ({ episode = new Episode()} = {}) {
  const content = html`

    <main class="content stack">
      <h1>Downloads</h1>
      <ul class="text">
        <li><a href="${ episode.toURL("/download") }" download>Download this episode (JSON)</a></li>
        <li><a href="${ episode.toURL("/download/csv") }" download>Download this episode's record log (CSV)</a></li>
      </ul>
    </main>

  `;

  return EpisodeLayout({episode}, content);
}