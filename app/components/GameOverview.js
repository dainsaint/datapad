import { map } from "../core/utils.js";
import LayoutToolbar from "./LayoutToolbar.js";

export default function GameOverview (game) {
  return `${LayoutToolbar(null, `<main class="content stack">
      <h1>${game.name}</h3>

      <h2>Sessions</h2>
      <ol class="cards">
        ${game.sessions.map(
          (session) =>
            `<li><a href="${ session.toURL() }">bleh</a></li>`
        )}
      </ol>

      <h2>Players</h2>
      <ul>
        ${ map( game.players, player => `<li><a href="${ player.toURL() }">${player.name}</a></li>`) }
      </ul>

    </main>
  `
  )}`;
}