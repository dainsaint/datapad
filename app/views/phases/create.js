import { html, from } from "#core/utils";
import Phase, { PhaseType } from "#models/phase";

export default function PhaseCreate({ episode } = {}) {
  return html`
    <h1>Add a phase</h1>

    <form hx-post="${episode.toURL("/phases")}" class="stack">
    
      <label for="type">Phase Type</label>
      <select name="type">
        ${ Object.values(PhaseType).map( type => 
          html`<option ${{value: type}}>${type}</option>`
        )}
      </select>


      <label for="duration">Duration</label>
      <div class="grid-two">
        <select name="duration[minutes]">
          ${ from(0).to(30).map( minutes =>
            html`<option ${{value: minutes }}>${minutes}m</option>`
          )}
        </select>

        <select name="duration[seconds]">
          ${ [0, 15, 30, 45].map( seconds =>
            html`<option ${{value: seconds.toString() }}>${seconds}s</option>`
          )}
        </select>
      </div>

      <div class="layout-row gap-tight">
        <button type="submit"><i class="fa fa-plus-circle"></i> Add Phase</button>
        <button type="button" value="cancel">Cancel</button>
      </div>
    </form>
  `;
}