import { cx, map } from "#core/utils"
import Ledger from "#models/ledger";
import { linkTo } from "../../../app/router";

export async function get(req) {
  const { id } = req.params;

  const episode = Ledger.getEpisodeByResourceId(id);
  const resource = episode.getResourceById(id);

  return { episode, resource };
};

export default function ResourceEdit({ episode, resource }) {
  const myCommunity = episode.communities.find( community => community.hasResource(resource) );

  return `
    <form class="stack" hx-patch=${ linkTo('..') }>
      <h1>Edit a resource</h1>
      <p class="text">Enter a name for this resource</p>
      <label for="name">Name</label>
      <input name="name" placeholder="New Resource" value="${ resource.name }"/>
      <label for="communityId">Community</label>
      <select name="communityId">
      ${ map( episode.societies, society => {
        return `
          <optgroup label="${ society.name }">
            ${ map( society.communities, community => `<option value="${ community.id }" ${ cx({selected: community.id === myCommunity.id}) }>${community.name}</option>`) }
          </optgroup>
        `
      } ) }
      </select>
      <div class="layout-horizontal">
        <button>~ Update Resource</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
    </form>
  `;
}