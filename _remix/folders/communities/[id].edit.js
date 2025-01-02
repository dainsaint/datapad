import { cx, map } from "#core/utils";
import Ledger from "#models/ledger";
import { linkTo } from "../../../app/router.js";

export async function get(req) {
  const { id } = req.params;

  const episode = Ledger.getEpisodeByCommunityId(id);
  const community = episode.getCommunityById(id);

  return { episode, community };
}

export default function CommunityEdit({ episode, community }) {
  const mySociety = episode.societies.find( society => society.hasCommunity(community) );

  return `
    <form class="stack" hx-patch="${ linkTo('.') }">
      <h1>Edit a community</h1>
      <p class="text">Enter a name/archetype for this community</p>
      <label for="name">Name</label>
      <input autofocus name="name" placeholder="New Community" value="${ community.name }"/>
      <label for="society_id">Society</label>
      <select name="society_id">
        ${ map( episode.societies, society => `<option value="${society.id}" ${ cx({"selected": society.id === mySociety.id }) }>${society.name}</option>` ) }
      </select>

      <label for="voice">Voice</label>
      <select name="voice">
        <option value="people" ${ cx({"selected": community.voice == "people"}) }>Voice of the People</option>
        <option value="leader" ${ cx({"selected": community.voice == "leader"}) }>Voice of the Leaders</option>
      </select>

      <input type="hidden" name="episodeId" value="${ episode.id }"/>

      <div class="layout-horizontal">
        <button>~ Update Community</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
    </form>
  `;
}