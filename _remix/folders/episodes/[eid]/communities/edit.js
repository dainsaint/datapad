import { attr, map } from "#core/utils";
import Episode from "#models/episode";

export async function get(req) {
  const { community_id, id } = req.params;

  const episode = Episode.load(id);
  const community = episode.getCommunityById(community_id);

  return { community };
}


export default function CommunityEdit({ community }) {
  const episode = Episode.load(community.episode);
  const mySociety = episode.societies.find( s => s.getCommunityById( community.id ));
  return `
    <form class="stack" hx-patch="${ community.toURL('/edit') }">
      <h1>Edit a community</h1>
      <p class="text">Enter a name/archetype for this community</p>
      <label for="name">Name</label>
      <input autofocus name="name" placeholder="New Community" value="${ community.name }"/>
      <label for="society_id">Society</label>
      <select name="society_id">
        ${ map( episode.societies, society => `<option value="${society.id}" ${ attr("selected", society.id === mySociety.id) }>${society.name}</option>` ) }
      </select>

      <label for="voice">Voice</label>
      <select name="voice">
        <option value="people" ${ attr("selected", community.voice == "people") }>Voice of the People</option>
        <option value="leader" ${ attr("selected", community.voice == "leader") }>Voice of the Leaders</option>
      </select>
      <div class="layout-horizontal">
        <button>~ Update Community</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
    </form>
  `;
}


export async function patch(req, res) {
  const { community_id, id } = req.params;
  const { society_id, resource_ids = [] } = req.body;

  const episode = Episode.load(id);
  const community = episode.getCommunityById(community_id);

  //update resources
  const resources = resource_ids.map(episode.getResourceById);
  community.resources = resources;

  //update societies (encapsulate!)
  const prevSociety = episode.societies.find((society) =>
    society.getCommunityById(community_id)
  );
  const nextSociety = episode.getSocietyById(society_id);

  if (prevSociety && nextSociety && prevSociety != nextSociety) {
    prevSociety.removeCommunity(community);
    nextSociety.addCommunity(community);
  }

  episode.save();

  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);
  res.sendStatus(200);
  broadcast("resources");
}
