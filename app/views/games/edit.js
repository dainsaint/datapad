import { html } from "#core/utils";
import Game from "#models/game";

export default function GameEdit({ game = new Game() } = {}) {
  return html`
    <form class="stack" onsubmit="event.preventDefault()">
      <h1>Create a new game</h1>
      <p class="text">Enter a name for this dingy. Use the format "Location - Month Year", i.e. "Pendle Hill - January 2024"</p>
      <label for="name">Name</label>
      <input name="name" autofocus autocapitalize="words" placeholder="Enter Game Name" />
      <div class="layout-row gap-tight">
        <button>+ New Game</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
    </form>
  `;
}