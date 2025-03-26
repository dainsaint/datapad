import { html } from "#core/utils";
import Episode from "#models/episode";
import { ResourceTag } from "#models/resource";

export default function ResourceEdit({ resource }) {
  const episode = resource.episode;
  const myCommunity = episode.getCommunityById( resource.communityId );

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
      <input type="hidden" name="shouldAlterTags" value="true"/>

      ${ Checkbox({ label: "★Vital Resource", name: `vital`, checked: resource.isVital, value: ResourceTag.VITAL }) }

      ${ Checkbox({ label: "Is Exhausted", name: `exhausted`, checked: resource.isExhausted, value: ResourceTag.EXHAUSTED }) }

      <div class="layout-row gap-tight">
        <button>~ Update Resource</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
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