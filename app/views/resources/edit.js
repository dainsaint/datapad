import { html } from "#core/utils";
import Episode from "#models/episode";

export default function ResourceEdit({ resource }) {
  const episode = Episode.load( resource.episode );
  const myCommunity = episode.communities.find( c => c.resources.some( r => r.id === resource.id ) ); //yikes

  return html`
    <form class="stack" hx-patch=${ resource.toURL() }>
      <h1>Edit a resource</h1>
      <p class="text">Enter a name for this resource</p>
      <label for="name">Name</label>
      <input name="name" autofocus autocapitalize="words" placeholder="New Resource" value="${ resource.name }"/>
      <label for="communityId">Community</label>
      <select name="communityId">
      ${ episode.societies.map( society => {
        return `
          <optgroup label="${ society.name }">
            ${ society.communities.map( community => 
              html`<option value="${ community.id }" ${ community.id === myCommunity.id && "selected" }>${community.name}</option>`
            )}
          </optgroup>
        `
      } ) }
      </select>
      <div class="layout-row gap-tight">
        <button>~ Update Resource</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
    </form>
  `;
}