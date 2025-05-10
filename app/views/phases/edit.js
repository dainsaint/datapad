import { html, from } from "#core/utils";
import { PhaseType } from "#models/phase";

export default function PhaseEdit({ phase } = {}) {
  const phaseMinutes = Math.floor(phase.duration / 60);
  const phaseSeconds = phase.duration - phaseMinutes * 60;
  
  return html`
    <form hx-post="${phase.toURL()}" class="stack">
      <label for="type">Phase Type</label>
      <select name="type">
        ${ Object.values(PhaseType).map( type => 
          html`<option ${{value: type, selected: phase.type == type}}>${type}</option>`
        )}
      </select>


      <label for="duration">Duration</label>
      <div class="grid-two">
        <select name="duration[minutes]">
          ${ from(0).to(30).map( minutes =>
            html`<option ${{value: minutes, selected: phaseMinutes == minutes }}>${minutes}m</option>`
          )}
        </select>

        <select name="duration[seconds]">
          ${ [0, 15, 30, 45].map( seconds =>
            html`<option ${{value: seconds.toString(), selected: phaseSeconds == seconds }}>${seconds}s</option>`
          )}
        </select>
      </div>

      <div class="layout-row gap-tight">
        <button type="submit"><i class="fa fa-check-circle"></i> Update Phase</button>
        <button type="button" value="cancel">Cancel</button>
      </div>


      <footer>
        <a hx-delete="${ phase.toURL() }">Delete Phase</a>
      </footer>
      
    </form>
  `;
}