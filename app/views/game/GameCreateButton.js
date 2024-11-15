import View from "../../core/view.js";

export default class GameCreateButton extends View {
  render() {
    return `
      <a 
        class="button game-create-button" 
        hx-post="/game"
      >
        + Create a new game
      </a>
    `;
  }
}