import { html } from "#core/utils";
import Episode from "#models/episode";
import { Select } from "#views/ui/forms";
import Icon from "#views/ui/icon";


export default function SocietyEmissary({ society } = {}) {
  const episode = society.episode;
  const roundData = society.getRoundData( episode.currentPhase.round );

  return html`
    <form class="stack-loose" hx-post="${ society.toURL("/emissary") }" hx-swap="none">
      <header class="stack-tight">
        <h1>Select an Emissary</h1>
        <p>Selecting for ${society.name}</p>
        <input type="hidden" name="round" value="${ roundData.round }"/>
      </header>

      <fieldset>
        <label for="emissaryCommunityId">Which community?</label>
        ${ Select({ name: "emissaryCommunityId", current: roundData.emissaryCommunityId, options: [{id: "", name: "--Not Elected--"}, ...society.communities] }) }
      </fieldset>

      <footer class="layout-spread stack-push">
        <button type="submit">${Icon("emissary")} Select Emissary</button>
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}