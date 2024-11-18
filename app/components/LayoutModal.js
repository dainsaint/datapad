export default function LayoutModal( content ) {
  return `
    <section class="layout-modal">
      <div class="layout-modal-content content shadow">
        ${content}
      </div>
    </section>
  `;
}