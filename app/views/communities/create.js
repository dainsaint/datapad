import Select from "#views/ui/select";

export default function CommunityCreate({ episode, society }) {
  const currentSociety = society;

  return `
    <form class="stack" hx-post="${ episode.toURL('/communities') }">
      <h1>Create a new community</h1>
      <p class="text">Enter a name/archetype for this community</p>
      
      <label for="name">Name</label>
      <input autofocus name="name" placeholder="New Community" />

      <label for="societyId">Society</label>
      ${ Select({ name: "societyId", current: currentSociety, options: episode.societies }) }

      <label for="voice">Voice</label>
      <select name="voice">
        <option value="people">Voice of the People</option>
        <option value="leader">Voice of the Leaders</option>
      </select>

      <div class="layout-horizontal">
        <button>+ New Community</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
    </form>
  `;
}