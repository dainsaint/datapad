import { attr, map } from "../../core/utils.js";
import Session from "../../models/session.js";

export default function CommunityCreate({ community }) {
  const session = Session.load(community.session);
  const mySociety = session.societies.find( s => s.getCommunityById( community.id ));
  return `
    <form class="stack" hx-patch="${ community.toURL() }">
      <h1>Edit a community</h1>
      <p class="text">Enter a name/archetype for this community</p>
      <label for="name">Name</label>
      <input autofocus name="name" placeholder="New Community" value="${ community.name }"/>
      <label for="society_id">Society</label>
      <select name="society_id">
        ${ map( session.societies, society => `<option value="${society.id}" ${ attr("selected", society.id === mySociety.id) }>${society.name}</option>` ) }
      </select>

      <label for="voice">Voice</label>
      <select name="voice">
        <option value="people" ${ attr("selected", community.voice == "people") }>Voice of the People</option>
        <option value="leader" ${ attr("selected", community.voice == "leader") }>Voice of the Leaders</option>
      </select>
      <div class="layout-horizontal">
        <button>~ Update Community</button>
        <button onclick="this.closest('dialog').remove()">Cancel</button>
      </div>
    </form>
  `;
}