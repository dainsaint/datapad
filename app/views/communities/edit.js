import { html } from "#core/utils"

export default function CommunityEdit({ community }) {
  const episode = community.episode;
  const mySociety = episode.getSocietyById( community.societyId );
  
  return html`
    <form class="stack-loose" hx-patch="${ community.toURL() }">
      <header class="stack-tight">
        <h1>Edit community</h1>
        <div><a class="color-danger" hx-delete="${ community.toURL() }" hx-confirm="Delete for sure?"><i class="fa fa-trash"></i> Delete Community</a></div>
      </header>

      <fieldset>
        <label for="name">Name</label>
        <input name="name" autofocus autocapitalize="words" placeholder="New Community" value="${ community.name }"/>
      </fieldset>

      <fieldset>
        <label for="societyId">Society</label>
        <select name="societyId">
          ${ episode.societies.map(society => html`<option value="${society.id}" ${{selected: society.id === mySociety.id}}>${society.name}</option>`) }
        </select>
      </fieldset>

      <fieldset>
        <label for="voice">Voice</label>
        <select name="voice">
          <option value="people" ${{selected: community.voice == "people"}}>Voice of the People</option>
          <option value="leader" ${{selected: community.voice == "leader"}}>Voice of the Leaders</option>
        </select>
      </fieldset>

      <footer class="layout-spread stack-push">
        <button><i class="fa fa-check-circle"></i> Update Community</button>  
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}
