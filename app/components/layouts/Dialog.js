export default function Dialog(content) {
  return `
    <dialog class="stack" hx-on:htmx:load="this.showModal()">
      ${content}
    </dialog>
  `;
}
