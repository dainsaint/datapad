import { html } from "#core/utils";
import { CommunityVoice } from "#models/community";
import { RadioContent } from "#views/ui/forms";
import Icon from "#views/ui/icon";
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
        <div class="grid-two gap-tight">
          ${Object.values(CommunityVoice).map( voice => CommunityVoiceInput({voice}))}
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