import { html, from } from "#core/utils";
import { DateTime } from "luxon";

export default function PhaseEdit({ phase } = {}) {
  
  return html`
    <form hx-post="${phase.toURL()}" class="stack">
      <label for="name">Phase Name</label>
      <input name="name" autofocus autocapitalize="words" type="text" value="${phase.name}"/>

      <label for="round">Round</label>
      <input name="round" type="number" value="${phase.round}" min="-1" max="10"/>

      <label for="duration">Duration</label>
      <div class="grid-two">
        <select name="duration[minutes]">
          ${ from(0).to(30).map( minutes =>
            html`<option ${{value: minutes, selected: false }}>${minutes}m</option>`
          )}
        </select>

        <select name="duration[seconds]">
          ${ [0, 15, 30, 45].map( seconds =>
            html`<option ${{value: seconds.toString(), selected: false }}>${seconds}s</option>`
          )}
        </select>
      </div>

      <div class="layout-row gap-tight">
        <button type="submit">~ Update Phase</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
      
    </form>
  `;
}