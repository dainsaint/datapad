export default function Dialog(content) {
  return `
    <dialog hx-on:htmx:load="this.showModal()">
      ${ content }
    </dialog>
  `;
}
