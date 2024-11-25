import { map } from "../core/utils.js";
import GameCard from "./GameCard.js";
import LayoutToolbar from "./LayoutToolbar.js";

export default function Home (games, session) {
  const content = `
    <main class="content stack">
      <h1>Games</h1>
      ${map(games, GameCard)}
      <button 
        hx-get="/ui/game/create"
        hx-target="#app"
        hx-swap="beforeend"
      >
        + Create a new game
      </button>
    </main>

  `;



  return LayoutToolbar(session, content);
}