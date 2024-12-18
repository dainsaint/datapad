import { map } from "../../core/utils.js"
import Session from "../../models/session.js";

export default function ResourceEdit({ resource }) {
  const session = Session.load( resource.session );
  const myCommunity = session.communities.find( c => c.resources.some( r => r.id === resource.id ) ); //yikes

  return `
    <form class="stack" hx-patch=${ resource.toURL() }>
      <h1>Edit a resource</h1>
      <p class="text">Enter a name for this resource</p>
      <label for="name">Name</label>
      <input name="name" placeholder="New Resource" value="${ resource.name }"/>
      <label for="community_id">Community</label>
      <select name="community_id">
      ${ map( session.societies, society => {
        return `
          <optgroup label="${ society.name }">
            ${ map( society.communities, community => `<option value="${ community.id }" ${ community.id === myCommunity.id && "selected" }>${community.name}</option>`) }
          </optgroup>
        `
      } ) }
      </select>
      <div class="layout-horizontal">
        <button>~ Update Resource</button>
        <button onclick="this.closest('dialog').remove()">Cancel</button>
      </div>
    </form>
  `;
}