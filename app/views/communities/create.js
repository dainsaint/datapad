import { html } from "#core/utils";
import Select from "#views/ui/select";

export default function CommunityCreate({ episode, society }) {
  return html`
    <form class="stack-loose" hx-post="${ episode.toURL('/communities') }">
      <h1>Create a new community</h1>
      
      <fieldset>
        <label for="name">Name</label>
        <input name="name" placeholder="New Community" autofocus autocapitalize="words" required />
      </fieldset>

      
      <fieldset>
        <label for="societyId">Society</label>
        ${ Select({ name: "societyId", current: society, options: episode.societies }) }
      </fieldset>


      <fieldset>
        <label for="voice">Voice</label>
        <select name="voice">
          <option value="people">Voice of the People</option>
          <option value="leader">Voice of the Leaders</option>
        </select>
      </fieldset>

      <footer class="layout-row gap-tight stack-push">
        <button class="color-river-stone" ><i class="fa fa-people-group"></i> Create Community</button>
        <div class="layout-fill"></div>
        <buttontype="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}