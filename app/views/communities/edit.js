import { html } from "#core/utils"
import { CommunityVoiceInput } from "#views/communities/create";
import { CommunityVoice } from "#models/community";

export default function CommunityEdit({ community }) {
  const episode = community.episode;
  const mySociety = episode.getSocietyById( community.societyId );

  const turn = mySociety.currentTurn;
  const ambassadorSociety = turn.getAmbassadorSociety( community.id );
  
  return html`
    <form class="stack-loose" hx-patch="${ community.toURL() }">
      <header class="stack-tight">
        <h1>Edit community</h1>
        <div><a class="color-danger" hx-delete="${ community.toURL() }" hx-confirm="This will fully delete the community, as if it never existed. Continue?"><i class="fa fa-trash"></i> Delete Community</a></div>
      </header>

      <fieldset>
        <label for="name">Name</label>
        <input name="name" autocapitalize="words" placeholder="Community Name" value="${ community.name }"/>
      </fieldset>


      <fieldset>
        <label for="player">Player</label>
        <input name="player" autocapitalize="words" type="text" list="players" placeholder="Pat Person (they/them)" value="${ community.player }"/>
        <datalist id="players">
          ${ mySociety.players.map( player => html`<option>${ player }</option>`) }
        </datalist>
      </fieldset>


      <fieldset>
        <label for="voice">Voice</label>
        <div class="grid-two gap-tight">
          ${Object.values(CommunityVoice).map( voice => CommunityVoiceInput({voice, checked: community.voice == voice}))}
        </div>
      </fieldset>

      
      <div class="grid-two">

        <fieldset>
          <label for="societyId">Home Society</label>
          <select name="societyId">
            ${ episode.societies.map(society => html`<option value="${society.id}" ${{selected: society.id === mySociety.id}}> ${society.name}</option>`) }
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

      </div>

      <footer class="layout-row gap stack-push">
        <button><i class="fa fa-check-circle"></i> Update Community</button>  
        <button class="color-danger" hx-post="${ community.toURL("/lose") }" hx-confirm="Lose this community (during gameplay?)"><i class="fa fa-fire"></i> Lose Community</button>
        <div class="layout-fill"></div>
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}

