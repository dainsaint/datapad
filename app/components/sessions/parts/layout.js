import SessionStatusBar from "./statusbar.js";
import SessionToolbar from "./toolbar.js";

export default function SessionLayout(session, content) {
  return `
    <section class="layout-toolbar">
      ${SessionToolbar(session)}
      <div class="layout-column">
        ${SessionStatusBar(session)}
        ${content}
      </div>
    </section>
  `;
}