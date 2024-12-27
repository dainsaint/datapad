import { map } from "../../core/utils.js"

export default function ResourceCreate({ session }) {

  return `
    <form class="stack" hx-post=${ session.toURL("/resources") }>
      <h1>Create a new resource</h1>
      <p class="text">Enter a name for this resource</p>
      <label for="name">Name</label>
      <input autofocus name="name" placeholder="New Resource" />
      <label for="community_id">Community</label>
      <select name="community_id">
      ${ map( session.societies, society => {
        return `
          <optgroup label="${ society.name }">
            ${ map( society.communities, community => `<option value="${ community.id }">${community.name}</option>`) }
          </optgroup>
        `
      } ) }
      </select>
      <div class="layout-horizontal">
        <button type="submit">+ New Resource</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
    </form>
  `;
}