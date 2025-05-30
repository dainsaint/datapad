import { html } from "#core/utils";
import Episode from "#models/episode";
import { Select } from "#views/ui/forms";
import Icon from "#views/ui/icon";


export default function SocietyAmbassador({ society } = {}) {
  const episode = society.episode;
  const roundData = society.getRoundData( episode.currentPhase.round );
  const turn = society.getCurrentTurn;

  return html`
    <form class="stack-loose" hx-post="${ society.toURL("/ambassador") }" hx-swap="none">
      <header class="stack-tight">
        <h1>Manage ambassadors</h1>
        <p>Sending from ${society.name}</p>
        <input type="hidden" name="episodeId" value="${episode.id}"/>
      </header>

      <footer class="layout-spread stack-push">
        <button type="submit">${Icon("people-ambassador")} Update Ambassadors</button>
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}