import View from "../../core/view.js";
import SessionListView from "../session/session-list-view.js";

export default class GameFullView extends View {
  render(game) {
    const sessionListView = new SessionListView();
    return `
      <div class="game-full-view">
        <h1>${game.name}</h3>
        <a href="/">View All</a><br/>
        <h2>Sessions</h2>
        <div>
          ${game.sessions.map( sessionListView.render )}
        </div>
        <h2>Players</h2>
      </div>
    `;
  }
}