import { map } from "../../core/utils.js"

export default function ResourceCreate({ episode, society }) {
  const current = society;
  return `
    <form class="stack" hx-post=${ episode.toURL("/resources") }>
      <h1>Create a new resource</h1>
      <p class="text">Enter a name for this resource</p>
      <label for="name">Name</label>
      <input autofocus name="name" placeholder="New Resource" />
      <label for="communityId">Community</label>

      <select name="communityId">
      ${ map( episode.societies, society => {
        return `
          <optgroup label="${ society.name }">
            ${ map( society.communities, ( community, i ) => `<option value="${ community.id }" ${ current == society.id && i == 0 ? "selected" : ""}>${community.name}</option>`) }
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