import LayoutToolbar from "./LayoutToolbar.js";

export default function GameOverview (game) {
  return `${LayoutToolbar(null, `<main class="content stack">
      <h1>${game.name}</h3>

      <h2>Sessions</h2>
      <ol class="cards">
        ${game.sessions.map(
          (session) =>
            `<li><a href="/game/${game._id}/session/${session._id}">bleh</a></li>`
        )}
      </ol>

      <h2>Players</h2>
      <ul>
        ${game.players.map((player) => `<li>${player.name}</li>`).join("\n")}
      </ul>

    </main>
  `
  )}`;
}