import { cx, map } from "#core/utils";

export default function ResourceCreate({ episode, society }) {
  const current = society;
  return `
    <form class="stack" hx-post="${ episode.toURL('/resources') }">
      <header>
        <h1>Create a new resource</h1>
      </header>

      <article class="stack">
        <label for="name">Name</label>
        <input autofocus name="name" placeholder="New Resource" />
        <label for="communityId">Community</label>

        <select name="communityId">
        ${ map( episode.societies, society => `
            <optgroup label="${ society.name }">
              ${ map( society.communities, ( community, i ) => `<option value="${ community.id }" ${ cx({ selected: i== 0 && current == society.id }) }>${community.name}</option>`) }
            </optgroup>
          `
        )}
        </select>
      </article>

      <footer class="layout-horizontal">
        <button type="submit">+ New Resource</button>
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}