import GameCard from "../game/GameCard.js";
import GameCreateButton from "../game/GameCreateButton.js";
import StatusBar from "../ui/StatusBar.js";
import Toolbar from "../ui/Toolbar.js";

export default function Home (games, session) {
  return `
    <section class="home-page app-page" >
      ${ Toolbar() }
      <div class="home-page__main page-main">
        ${ StatusBar(session)}
        <main class="main-content">
          ${ games.map( GameCard ).join("\n") }
          ${ GameCreateButton() } 
        </main>
      </div>
    </section>
  `;
}