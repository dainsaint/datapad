import GameCard from "./GameCard.js";
import StatusBar from "./StatusBar.js";
import Toolbar from "./Toolbar.js";

export default function Home (games, session) {
  return `
    <section class="frame-toolbar">
      ${Toolbar()}
      <div class="layout-column">
        ${StatusBar(session)}
        <main class="content stack">
          <h1>Games</h1>
          ${games.map(GameCard).join("\n")}
          <button>+ Create a new game</button>
        </main>
      </div>
    </section>
  `;
}