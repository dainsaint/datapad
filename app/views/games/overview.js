import { html } from "#core/utils";

export default function GameOverview ({ game }) {
  return html`<main class="content stack">
      <h1>${game.name}</h3>

      <h2>Episodes</h2>
      <ol class="cards">
        ${game.episodes.map((episode) => html`<li><a href="${episode.toURL()}">bleh</a></li>`)}
      </ol>
    </main>
  `;
}