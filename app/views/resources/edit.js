import { html } from "#core/utils";
import Episode from "#models/episode";
import { ResourceTag } from "#models/resource";

export default function ResourceEdit({ resource }) {
  const episode = resource.episode;
  const myCommunity = episode.getCommunityById( resource.communityId );

  return html`
    <form class="stack-loose" hx-patch=${ resource.toURL() }>
      <header class="stack-tight">
        <h1>Edit resource</h1>
        <div>
          <a class="color-danger" hx-delete="${ resource.toURL() }" hx-confirm="This will PERMANENTLY delete this resource!"><i class="fa fa-trash"></i> Delete Resource</a>
        </div>
      </header>
      
      <fieldset>
        <label for="name">Name</label>
        <input name="name" autofocus autocapitalize="words" placeholder="New Resource" value="${ resource.name }"/>
      </fieldset>

      <fieldset>
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
      </fieldset>

      <fieldset>
        <input type="hidden" name="shouldAlterTags" value="true"/>
        ${ Checkbox({ label: `Exhausted <i class="fa fa-battery-quarter"></i>`, name: `exhausted`, checked: resource.isExhausted, value: ResourceTag.EXHAUSTED }) }
      </fieldset>

      <fieldset class="layout-spread stack-push">
        <button><i class="fa fa-check-circle"></i> Update Resource</button>
        <button type="button" value="cancel">Cancel</button>
      </fieldset>
    </form>
  `;
}



function Checkbox({label, name = "", value = false, checked = false}){
  return html`
    <div class="form-control">
      <input name="${name}" type="checkbox" ${ checked && "checked" } value="${value}"/>
      <label for="${name}">${ label }</label>
    </div>
  `
}; 



      // <label for="tags">Statuses</label>
      // <div class="stack-tight">
      // ${
      //   Object.keys( ResourceTag ).map( tag => html`
      //   <div class="form-control">
      //     <input type="checkbox"></input>
      //     <label>${ tag }</label>
      //   </div>
      //   ` )
      // }
      // </div>