import { cx, map } from "#core/utils"
import Episode from "#models/episode";
import { linkTo } from "../../../app/router.js";

export async function get(req, res, next) {
  const { episodeId, societyId } = req.query;
  const episode = Episode.load(episodeId);
  return { episode, societyId };
};

export default function ResourceCreate({ episode, societyId }) {
  const current = societyId;

  return `
    <form class="stack" hx-post=${ linkTo('..') }>
      <input type="hidden" name="episodeId" value="${episode.id}"/>
      <h1>Create a new resource</h1>
      <p class="text">Enter a name for this resource</p>
      <label for="name">Name</label>
      <input autofocus name="name" placeholder="New Resource" />
      <label for="communityId">Community</label>

      <select name="communityId">
      ${ map( episode.societies, society => {
        return `
          <optgroup label="${society.name}">
            ${map( society.communities, (community, i) =>
                `<option value="${community.id}" ${ cx({ selected: i == 0 && current == society.id }) }>
                  ${community.name}
                </option>`
            )}
          </optgroup>
        `;
      } ) }
      </select>

      <div class="layout-horizontal">
        <button type="submit">+ New Resource</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
    </form>
  `;
}