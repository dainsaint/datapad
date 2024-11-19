import LayoutModal from "./LayoutModal.js";

export default function ModalCreateGame() {

  return LayoutModal(`
    <form class="stack">
      <h1>Create a new game</h1>
      <p class="text">Enter a name for this dingy. Use the format "Location - Month Year", i.e. "Pendle Hill - January 2024"</p>
      <label for="name">Name</label>
      <input name="name" placeholder="Enter Game Name" />
      <div class="layout-horizontal">
        <button>+ New Game</button>
        <button>Cancel</button>
      </div>
    </form>;
`);
}
