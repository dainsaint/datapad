import { html } from "#core/utils";
import Episode from "#models/episode";
import { Select } from "#views/ui/forms";
import Icon from "#views/ui/icon";

export default function TurnAmbassador({ turn } = {}) {

  return html`
    <form class="stack-loose" hx-post="${ turn.toURL("/ambassador") }" hx-swap="none">
      <div class="grid-two">
        <fieldset>
          <label for="communityId">Send community...</label>
          ${ Select({ name: "communityId", current: null, options: society.communities }) }
        </fieldset>

        <fieldset>
          <label for="ambassadorSocietyId">...To this Society</label>
          ${ Select({ name: "ambassadorSocietyId", current: null, options: [{id: "", name: "--None--"}, ...episode.societies.filter( other => other !== society )] }) }
        </fieldset>

        <fieldset class="layout-row gap">
          <button>Send</button>
          <button>Recall</button>
        </fieldset>
      </div>
    </form>
  `;
}