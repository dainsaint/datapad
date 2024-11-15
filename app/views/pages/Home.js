import View from "../../core/view.js";
import GameCard from "../game/GameCard.js";
import GameCreateButton from "../game/GameCreateButton.js";
import StatusBar from "../ui/StatusBar.js";
import Toolbar from "../ui/Toolbar.js";

export default class Home extends View {
  render(games, session) {
    return `
      <section class="home-page app-page" >
        ${new Toolbar().render()}
        <div class="home-page__main page-main">
          ${new StatusBar().render(session)}
          <main class="main-content">
            ${ games.map( game => new GameCard().render(game) ).join("\n") }
            ${ new GameCreateButton().render() } 
          </main>
        </div>
      </section>
    `;
  }

}
