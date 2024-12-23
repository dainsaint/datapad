export default function DialogCreateSociety(session) {
  return `
    <dialog id="dialog-create-society" hx-on:htmx:load="this.showModal()" >
      <h1>Create a new society</h1>
      <p class="text">Enter a name for this new society, and select its archetype.</p>

      <form class="stack" hx-post="${ session.toURL('/societies') }" hx-swap="none">
        <input type="hidden" name="session_id" value="${session.id}"/>

        <label for="name">Society Name</label>
        <input autofocus name="name" placeholder="e.g. Ten Thousand Islands" />

        <label for="name">Society Archetype</label>
        <select name="archetype" placeholder="Select Archetype" >
          <option value="the aesthetic">The Aesthetic</option>
          <option value="the enterprise">The Enterprise</option>
          <option value="the faithful">The Faithful</option>
          <option value="the grounded">The Grounded</option>
          <option value="the intrepid">The Intrepid</option>
          <option value="the mighty">The Mighty</option>
          <option value="the scholars">The Scholars</option>
        </select>
        <button>Add Community...</button>

        <div class="layout-horizontal">
          <button type="submit">+ New Society</button>
          <button onclick="this.closest('dialog').remove()">Cancel</button>
        </div>
      </form>
    </dialog>
  `;
}
