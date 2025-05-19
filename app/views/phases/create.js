import { html, from } from "#core/utils";
import Phase, { PhaseType } from "#models/phase";

export default function PhaseCreate({ episode } = {}) {
  return html`
    <form class="stack-loose" hx-post="${episode.toURL("/phases")}">
      
      <h1>Add a phase</h1>
    
      <fieldset>
        <label for="type">Phase Type</label>
        <select name="type">
          ${ Object.values(PhaseType).map( type => 
            html`<option ${{value: type}}>${type}</option>`
          )}
        </select>
      </fieldset>


      <fieldset>
        <label for="duration">Duration</label>
        <div class="grid-two">
          <select name="duration[minutes]">
            ${ from(0).to(30).map( minutes =>
              html`<option ${{value: minutes, selected: minutes == 10 }}>${minutes}m</option>`
            )}
          </select>

          <select name="duration[seconds]">
            ${ [0, 15, 30, 45].map( seconds =>
              html`<option ${{value: seconds.toString() }}>${seconds}s</option>`
            )}
          </select>
        </div>
      </fieldset>

      <footer class="layout-spread stack-push">
        <button type="submit"><i class="fa fa-plus-circle"></i> Add Phase</button>
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}