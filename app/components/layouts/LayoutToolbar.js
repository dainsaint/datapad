import StatusBar from "../StatusBar.js";
import Toolbar from "../Toolbar.js";

export default function LayoutToolbar( session, content ) {
  return `
    <section class="layout-toolbar">
      ${Toolbar()}
      <div class="layout-column">
        ${StatusBar(session)}
        ${content}
      </div>
    </section>
  `;
}