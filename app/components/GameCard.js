import { pluralize } from "../core/utils.js";

export default function GameCard (game) {
  return `
    <a 
      class="card" 
      href="/game/${game._id}"
      data-id="${game._id}"
      hx-get="/game/basic/${game._id}"
      hx-swap="outerHTML"
      hx-trigger="every 5s"
    >
      <h2>${game.name}</h2>
      ${game.sessions.length} ${pluralize(game.sessions.length, "session")} •  
      ${game.players.length} ${pluralize(game.players.length, "player")}.
    </a>
  `;
}