import { from, html } from "#core/utils";
import { CommunityVoice } from "#models/community";
import { TurnOverrideVoice } from "#models/turn";
import { CommunityVoiceInput } from "#views/communities/create";
import { RadioContent, Toggle } from "#views/ui/forms";
import Icon from "#views/ui/icon";

export default function TurnLeadership({ turn } = {}) {
  turn.validateLeadership();
  const { alterLeadership } = turn;
  const communities = turn.society.activeCommunities.reduce( (map, community) => {
    map[community.id] = community;
    return map;
  }, {})

  return html`
    <form class="stack" hx-post="${ turn.toURL() }">
      <header class="stack-tight">
        <h1>Alter Leadership</h1>
        <p>Override leadership for this round only</p>
        <p>* indicates the community's "actual" current voice</p>
      </header>

      <div class="grid-two">
      ${ Object.entries( alterLeadership ).map( ([communityId, override]) => html`
        <fieldset>
          <label>${ communities[communityId].name }</label>
          <div class="grid-three gap-tight">
            ${ TurnOverrideVoiceInput({ name: `alterLeadership[${communityId}]`, voice: TurnOverrideVoice.LEADER, checked: override == TurnOverrideVoice.LEADER, isDefault: communities[communityId].voice == TurnOverrideVoice.LEADER }) }
            ${ TurnOverrideVoiceInput({ name: `alterLeadership[${communityId}]`, voice: TurnOverrideVoice.PEOPLE, checked: override == TurnOverrideVoice.PEOPLE, isDefault: communities[communityId].voice == TurnOverrideVoice.PEOPLE }) }
          </div>
        </fieldset>
        `)}
      </div>

      <footer class="layout-spread stack-push">
        <button type="submit"><i class="fa fa-check-circle"></i> Alter Leadership</button>
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}

export function TurnOverrideVoiceInput({ name, voice, checked, isDefault }) {
  return RadioContent({ 
    name: name, 
    value: voice, 
    checked,
    label: html`
      <div class="align-center">
        <div class="is-size-6">${voice != "None" && Icon(voice)} ${voice}${isDefault && "*"}</div>
      </div>`})

}



