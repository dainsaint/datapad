import { html } from "#core/utils";

export default function ResourceCreate({ episode, society, communityId }) {
  const isCommunitySelected = ( soc, community, i ) => {
    return community.id == communityId || (i == 0 && society == soc)
  }
  
  return html`
    <form class="stack-loose" hx-post="/resources/${episode.id}">
      <header>
        <h1>Create a new resource</h1>
      </header>

      <fieldset>
        <label for="name">Name</label>
        <input name="name" placeholder="New Resource" 
          autofocus 
          autocapitalize="words" 
          required />
      </fieldset>

      <fieldset>
        <label for="communityId">Community</label>
        <select name="communityId">
        ${ episode.societies.map( society => html`
            <optgroup label="${ society.name }">
              ${ society.activeCommunities.map(( community, i ) => 
                html`<option value="${ community.id }" ${{ selected: isCommunitySelected(society, community, i) }}>${community.name}</option>`
              )}
            </optgroup>
        `)}
        </select>
      </fieldset>

      <footer class="layout-spread stack-push">
        <button type="submit">+ New Resource</button>
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}