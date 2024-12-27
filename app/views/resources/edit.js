import { map } from "../../core/utils.js"
import Episode from "../../models/episode.js";

export default function ResourceEdit({ resource }) {
  const episode = Episode.load( resource.episode );
  const myCommunity = episode.communities.find( c => c.resources.some( r => r.id === resource.id ) ); //yikes

  return `
    <form class="stack" hx-patch=${ resource.toURL() }>
      <h1>Edit a resource</h1>
      <p class="text">Enter a name for this resource</p>
      <label for="name">Name</label>
      <input name="name" placeholder="New Resource" value="${ resource.name }"/>
      <label for="community_id">Community</label>
      <select name="community_id">
      ${ map( episode.societies, society => {
        return `
          <optgroup label="${ society.name }">
            ${ map( society.communities, community => `<option value="${ community.id }" ${ community.id === myCommunity.id && "selected" }>${community.name}</option>`) }
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