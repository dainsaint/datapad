import SessionOverview from "../session/SessionOverview.js";
import StatusBar from "../ui/StatusBar.js";
import Toolbar from "../ui/Toolbar.js";

export default function GameMaster( session ) {
  return `
    <section class="gm-page app-page" >
      ${ Toolbar() }
      <div class="gm-page__main page-main">
        ${ StatusBar( session ) }
        ${ SessionOverview( session ) }
      </div>
    </section>
  `;
}