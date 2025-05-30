import { html } from "#core/utils";
import Episode from "#models/episode";
import { Select } from "#views/ui/forms";
import Icon from "#views/ui/icon";


export default function SocietyEmissary({ society } = {}) {
  const turn = society.currentTurn;
  console.log( turn.id );

  return html`
    <form class="stack-loose" hx-post="${ turn.toURL("") }" hx-swap="none">
      <header class="stack-tight">
        <h1>Select an Emissary</h1>
        <p>Selecting for ${society.name}</p>
      </header>

      <fieldset>
        <label for="emissaryCommunityId">Which community?</label>
        ${ Select({ name: "emissaryCommunityId", current: turn.emissaryCommunityId, options: [{id: "", name: "--Not Elected--"}, ...society.communities] }) }
      </fieldset>

      <footer class="layout-spread stack-push">
        <button type="submit">${Icon("emissary")} Select Emissary</button>
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}