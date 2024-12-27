import { map } from "../../core/utils.js";

export default function GameOverview ({ game }) {
  return `<main class="content stack">
      <h1>${game.name}</h3>

      <h2>Episodes</h2>
      <ol class="cards">
        ${map( game.episodes, (episode) => `<li><a href="${episode.toURL()}">bleh</a></li>`)}
      </ol>
    </main>
  `;
}


/*

      <h2>Players</h2>
      <ul>
        ${ map( game.players, player => `<li><a href="${ player.toURL() }">${player.name}</a></li>`) }
      </ul>
*/