import SessionOverview from "./SessionOverview.js";
import StatusBar from "./StatusBar.js";
import Toolbar from "./Toolbar.js";

export default function GameMaster( session ) {
  return `
    <section class="frame-toolbar">
      ${ Toolbar() }
      <div class="layout-column">
        ${ StatusBar( session ) }
        ${ SessionOverview( session ) }
      </div>
    </section>
  `;
}