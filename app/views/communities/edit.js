import { html } from "#core/utils"
import { CommunityVoiceInput, CommunityRoleInput } from "#views/communities/create";
import { CommunityRole, CommunityVoice } from "#models/community";

export default function CommunityEdit({ community }) {
  const episode = community.episode;
  const mySociety = episode.getSocietyById( community.societyId );
  const ambassadorSociety = episode.getSocietyById( community.ambassadorSocietyId );
  
  return html`
    <form class="stack-loose" hx-patch="${ community.toURL() }">
      <header class="stack-tight">
        <h1>Edit community</h1>
        <div><a class="color-danger" hx-delete="${ community.toURL() }" hx-confirm="Delete for sure?"><i class="fa fa-trash"></i> Delete Community</a></div>
      </header>

      <fieldset>
        <label for="name">Name</label>
        <input name="name" autofocus autocapitalize="words" placeholder="Community Name" value="${ community.name }"/>
      </fieldset>


      <fieldset>
        <label for="player">Player</label>
        <input name="player" autocapitalize="words" placeholder="Pat Person (they/them)" value="${ community.player }"/>
      </fieldset>

      <fieldset>
        <label for="societyId">Society</label>
        <select name="societyId">
          ${ episode.societies.map(society => html`<option value="${society.id}" ${{selected: society.id === mySociety.id}}>${society.name}</option>`) }
        </select>
      </fieldset>


      <fieldset>
        <label for="ambassadorSocietyId">Ambassador To</label>
        <select name="ambassadorSocietyId">
          <option value="">None</option>
          ${ episode.societies
              .filter( society => society.id != mySociety.id )
              .map(society => html`<option value="${society.id}" ${{selected: society.id === ambassadorSociety?.id}}>${society.name}</option>`) }
        </select>
      </fieldset>

      <fieldset>
        <label for="voice">Voice</label>
        <div class="grid-two gap-tight">
          ${Object.values(CommunityVoice).map( voice => CommunityVoiceInput({voice, checked: community.voice == voice}))}
        </div>
      </fieldset>



      <footer class="layout-spread stack-push">
        <button><i class="fa fa-check-circle"></i> Update Community</button>  
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}

