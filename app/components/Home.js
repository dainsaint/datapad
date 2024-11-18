import GameCard from "./GameCard.js";
import LayoutToolbar from "./LayoutToolbar.js";

export default function Home (games, session) {
  const content = `
    <main class="content stack">
      <h1>Games</h1>
      ${games.map(GameCard).join("\n")}
      <button>+ Create a new game</button>
    </main>
  `;

  return LayoutToolbar(session, content);
}