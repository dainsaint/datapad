import View from "../../core/view.js";

export default class Toolbar extends View {
  render() {
    return `
    <nav class="toolbar">
      <ul class="icon-bar">
        <li class="icon-bar__button"><a href="/"><img src="/icons/spop.svg"/></a></li>
        <li class="icon-bar__button"><a href="/gm"><img src="/icons/dice.svg"/></a></li>
        <li class="icon-bar__button"><a href="/facilitator"><img src="/icons/societal.svg"/></a></li>
        <li class="icon-bar__button"><a href="/scripts"><img src="/icons/script.svg"/></a></li>
      </ul>
    </nav>
    `;
  }
}