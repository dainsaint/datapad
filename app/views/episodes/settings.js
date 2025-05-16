import { html } from "#core/utils";
import Episode from "#models/episode";
import EpisodeLayout from "./components/layout.js";

export default function EpisodeSettings ({ episode = new Episode()} = {}) {
  const content = html`

    <main class="panel content stack full">
      <h1>Episode Settings</h1>
      
      <h2>Documents</h2>
      form to add remove documents here

      <h2>Links</h2>
      lil for to set the Discord link here

      <h2>Download Data</h2>
      <ul class="text">
        <li><a href="${ episode.toURL("/download") }" download>Download this episode (JSON)</a></li>
        <li><a href="${ episode.toURL("/download/csv") }" download>Download this episode's record log (CSV)</a></li>
      </ul>
    </main>

  `;

  return EpisodeLayout({episode}, content);
}