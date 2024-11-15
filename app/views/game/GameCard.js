import View from "../../core/view.js";
import { pluralize } from "../../core/utils.js";

export default class GameCard extends View {
  render(game) {
    return `
      <a 
        class="game-card" 
        href="/game/${game._id}"
        data-id="${game._id}"
        hx-get="/game/basic/${game._id}"
        hx-swap="outerHTML"
        hx-trigger="every 5s"
      >
        <h3>${game.name}</h3>
        ${game.sessions.length} ${pluralize(game.sessions.length, "session")} •  
        ${game.players.length} ${pluralize(game.players.length, "player")}.
      </a>
    `;
  }
}