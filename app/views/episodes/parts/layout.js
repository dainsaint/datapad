import SessionStatusBar from "./statusbar.js";
import SessionToolbar from "./toolbar.js";

export default function SessionLayout(episode, content) {
  return `
    <section class="layout-toolbar">
      ${SessionToolbar({ episode })}
      <div class="layout-column">
        ${SessionStatusBar({ episode })}
        ${content}
      </div>
    </section>
  `;
}