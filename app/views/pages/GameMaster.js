import View from "../../core/view.js";
import SessionOverview from "../session/SessionOverview.js";
import StatusBar from "../ui/StatusBar.js";
import Toolbar from "../ui/Toolbar.js";

export default class GameMaster extends View {
  render(session) {
    return `
      <section class="gm-page app-page" >
        ${ new Toolbar().render() }
        <div class="gm-page__main page-main">
          ${ new StatusBar().render( session ) }
          ${ new SessionOverview().render( session ) }
        </div>
      </section>
    `;
  }

}
