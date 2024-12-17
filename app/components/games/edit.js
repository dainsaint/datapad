import Game from "../../models/game.js";

export default function GameEdit({ game = new Game() } = {}) {
  return `
    <form class="stack" onsubmit="event.preventDefault()">
      <h1>Create a new game</h1>
      <p class="text">Enter a name for this dingy. Use the format "Location - Month Year", i.e. "Pendle Hill - January 2024"</p>
      <label for="name">Name</label>
      <input autofocus name="name" placeholder="Enter Game Name" />
      <div class="layout-horizontal">
        <button>+ New Game</button>
        <button onclick="this.closest('dialog').remove()">Cancel</button>
      </div>
    </form>
  `;
}
