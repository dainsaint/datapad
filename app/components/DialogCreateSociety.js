export default function DialogCreateSociety() {
  return `
    <dialog id="dialog-create-society" hx-on:htmx:load="this.showModal()">
      <form class="stack" onsubmit="event.preventDefault()">
        <h1>Create a new society</h1>
        <p class="text">Enter a name for this new society, and select its archetype.</p>
        <label for="name">Society Name</label>
        <input autofocus name="name" placeholder="e.g. Ten Thousand Islands" />

        <label for="name">Society Archetype</label>
        <select name="archetype" placeholder="Select Archetype" >
          <option>The Aesthetic</option>
          <option>The Enterprise</option>
          <option>The Faithful</option>
          <option>The Grounded</option>
          <option>The Intrepid</option>
          <option>The Mighty</option>
          <option>The Scholars</option>
        </select>

        <div class="layout-horizontal">
          <button>+ New Society</button>
          <button onclick="this.closest('dialog').remove()">Cancel</button>
        </div>
      </form>
    </dialog>
  `;
}

