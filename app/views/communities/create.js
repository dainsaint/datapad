import { html } from "#core/utils";
import { CommunityVoice } from "#models/community";
import { RadioContent } from "#views/ui/forms";
import Icon from "#views/ui/icon";
import { Select } from "#views/ui/forms";

export default function CommunityCreate({ episode, society }) {
  return html`
    <form class="stack-loose" hx-post="/communities/${episode.id}">
      <h1>Create a new community</h1>
      
      <fieldset>
        <label for="name">Name</label>
        <input name="name" placeholder="New Community" autocapitalize="words" required />
      </fieldset>

      <fieldset>
        <label for="player">Player</label>
        <input name="player" autocapitalize="words" type="text" list="players" placeholder="Pat Person (they/them)"/>
        <datalist id="players">
          ${ society?.players?.map( player => html`<option>${ player }</option>`) }
        </datalist>
      </fieldset>


      
      <fieldset>
        <label for="societyId">Society</label>
        ${ Select({ name: "societyId", current: society?.id, options: episode.societies }) }
      </fieldset>


      <fieldset>
        <label for="voice">Voice</label>
        <div class="grid-two gap-tight">
          ${Object.values(CommunityVoice).map( voice => CommunityVoiceInput({voice, checked: voice == CommunityVoice.PEOPLE}))}
        </div>
      </fieldset>

      <footer class="layout-row gap-tight stack-push">
        <button><i class="fa fa-people-group"></i> Create Community</button>
        <div class="layout-fill"></div>
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}


export function CommunityVoiceInput({ voice, checked }) {
  return RadioContent({ 
    name: "voice", 
    value: voice, 
    checked,
    label: html`
      <div class="align-center">
        <div class="is-size-1">${Icon(voice)}</div>
        <div class="is-size-6">${voice}</div>
      </div>`})

}


export function CommunityRoleInput({ role, checked }) {
  return RadioContent({ 
    name: "role", 
    value: role, 
    checked,
    label: html`
      <div class="align-center">
        <div class="is-size-1">${Icon(role)}</div>
        <div class="is-size-6">${role}</div>
      </div>`})

}