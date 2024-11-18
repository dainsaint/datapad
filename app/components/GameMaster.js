import SessionOverview from "./SessionOverview.js";
import LayoutToolbar from "./LayoutToolbar.js";
import LayoutModal from "./LayoutModal.js";

export default function GameMaster( session ) {
    const content = `
    ${SessionOverview(session)}
    ${LayoutModal(`
    <form class="stack">
      <h1>Create a new game</h1>
      <p>Enter a name for this dingy</p>
      <label for="name">Name</label>
      <input name="name" placeholder="Enter Game Name"/>
      <div class="layout-horizontal">
        <button>+ New Game</button>
        <button>Cancel</button>
      </div>
    </form>
    `)}
  `;

    return LayoutToolbar(session, content);
}