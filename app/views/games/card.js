import { pluralize } from "../../core/utils.js";

export default function GameCard ({ game }) {
  return `
    <a 
      class="card" 
      href="${ game.toURL() }"
      hx-get="${ game.toURL('?view=card') }"
      hx-swap="outerHTML"
      hx-trigger="every 5s"
    >
      <h2>${game.name}</h2>
      ${game.episodes.length} ${pluralize(game.episodes.length, "episode")}
    </a>
  `;
}

// * ${game.players.length} ${pluralize(game.players.length, "player")}.