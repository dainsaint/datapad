import { html, from } from "#core/utils";
import { PhaseType } from "#models/phase";

export default function PhaseEdit({ phase } = {}) {
  const phaseMinutes = Math.floor(phase.duration / 60);
  const phaseSeconds = phase.duration - phaseMinutes * 60;
  
  return html`
    <form class="stack-loose" hx-put="${phase.toURL()}">
      <header class="stack-tight">
        <p class="subtitle">Round ${ phase.round }</p>
        <h1>Edit phase</h1>
        <div>
          <a class="color-danger" hx-delete="${ phase.toURL() }" hx-confirm="Delete phase for sure?"><i class="fa fa-trash"></i> Delete Phase</a>
        </div>
      </header>

      <fieldset>
        <label for="type">Phase Type</label>
        <select name="type">
          ${ Object.values(PhaseType).map( type => 
            html`<option ${{value: type, selected: phase.type == type}}>${type}</option>`
          )}
        </select>
      </fieldset>


      <fieldset>
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
      </fieldset>

      <div class="layout-row gap-tight stack-push">
        <button type="submit"><i class="fa fa-check-circle"></i> Update Phase</button>
        <button class="color-danger" name="timeElapsed" value="0"><i class="fa fa-arrow-rotate-left"></i> Reset Phase</button>
        <div class="layout-fill"></div>
        <button type="button" value="cancel">Cancel</button>
      </div>
    </form>
  `;
}