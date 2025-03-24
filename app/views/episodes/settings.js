import { html } from "#core/utils";
import Episode from "#models/episode";
import EpisodeLayout from "./components/layout.js";

export default function EpisodeSettings ({ episode = new Episode()} = {}) {
  const content = html`

    <main class="content stack">
      <h1>Settings</h1>
      <ul>
        <li>Download this episode (JSON)</li>
        <li>Download this episode (CSV)</li>
        <li>Make a brand new episode</li>
      </ul>
    </main>

  `;

  return EpisodeLayout({episode}, content);
}