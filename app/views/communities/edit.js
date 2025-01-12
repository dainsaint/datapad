import { html } from "#core/utils"
import Episode from "#models/episode";

export default function CommunityEdit({ community }) {
  const episode = Episode.load(community.episode);
  const mySociety = episode.societies.find( s => s.getCommunityById( community.id ));
  
  return html`
    <form class="stack" hx-patch="${ community.toURL() }">
      <h1>Edit a community</h1>
      <p class="text">Enter a name/archetype for this community</p>
      <label for="name">Name</label>
      <input name="name" autofocus autocapitalize="words" placeholder="New Community" value="${ community.name }"/>
      <label for="societyId">Society</label>
      <select name="societyId">
        ${ episode.societies.map(society => html`<option value="${society.id}" ${{selected: society.id === mySociety.id}}>${society.name}</option>`) }
      </select>

      <label for="voice">Voice</label>
      <select name="voice">
        <option value="people" ${{selected: community.voice == "people"}}>Voice of the People</option>
        <option value="leader" ${{selected: community.voice == "leader"}}>Voice of the Leaders</option>
      </select>
      <div class="layout-row gap-tight">
        <button>~ Update Community</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
    </form>
  `;
}