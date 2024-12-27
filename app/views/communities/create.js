import { map } from "../../core/utils.js";

export default function CommunityCreate({ episode }) {
  return `
    <form class="stack" hx-post="${ episode.toURL('/communities') }">
      <h1>Create a new community</h1>
      <p class="text">Enter a name/archetype for this community</p>
      <label for="name">Name</label>
      <input autofocus name="name" placeholder="New Community" />
      <label for="society_id">Society</label>
      <select name="society_id">
        ${ map( episode.societies, society => `<option value=${society.id}>${society.name}</option>` ) }
      </select>

      <label for="voice">Voice</label>
      <select name="voice">
        <option value="people">Voice of the People</option>
        <option value="leader">Voice of the Leaders</option>
      </select>
      <div class="layout-horizontal">
        <button>+ New Community</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
    </form>
  `;
}