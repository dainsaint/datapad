import { html } from "#core/utils";
import Episode from "#models/episode";
import { Select } from "#views/ui/forms";
import Icon from "#views/ui/icon";


export default function SocietyAmbassador({ society } = {}) {
  const episode = society.episode;
  const roundData = society.getRoundData( episode.currentPhase.round );

  return html`
    <form class="stack-loose" hx-post="${ society.toURL("/ambassador") }" hx-swap="none">
      <header class="stack-tight">
        <h1>Manage ambassadors</h1>
        <p>Sending from ${society.name}</p>
        <input type="hidden" name="episodeId" value="${episode.id}"/>
      </header>

      
      <div class="grid-two">
        <fieldset>
          <label for="communityId">Send community...</label>
          ${ Select({ name: "communityId", current: null, options: society.communities }) }
        </fieldset>

        <fieldset>
          <label for="ambassadorSocietyId">...To this Society</label>
          ${ Select({ name: "ambassadorSocietyId", current: null, options: [{id: "", name: "--None--"}, ...episode.societies.filter( other => other !== society )] }) }
        </fieldset>
      </div>

      <footer class="layout-spread stack-push">
        <button type="submit">${Icon("people-ambassador")} Update Ambassadors</button>
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}