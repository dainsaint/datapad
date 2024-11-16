export default function GameCreateButton () {
  return `
    <a class="button game-create-button" hx-post="/game">
      + Create a new game
    </a>
  `;
}