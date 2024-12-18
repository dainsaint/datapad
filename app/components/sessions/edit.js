import { map } from "../../core/utils.js";
import Ledger from "../../models/ledger.js";
import Session from "../../models/session.js";

export default function SessionEdit({ session = new Session() } = {}) {
  const games = Ledger.games;
  
  return `
    <form hx-post="${session.toURL()}" class="stack">
      Other info about the session timing goes here. 
      <li>This should be a form</li>
      
      <input name="id" type="hidden" value="${session.id}"/>

      <label for="name">Session Name</label>
      <input name="name" type="text" value="${session.name}"/>

      <label for="game">Game (Optional)</label>
      <input list="games-available" name="game" />
      <datalist id="games-available">
        ${map( games, (game) => `<option value=${game.id}>${game.name}</option>`)}
      </datalist>

      <label for="date">Date</label>
      <input name="date" type="date" value="${ session.date.toISODate() }"/>

      <div class="grid-two">
        <div>
          <label for="start">Scheduled Start</label>
          <input name="scheduledTime.s" type="time" value="${ session.scheduledTime.start?.toISOTime() }"/>
        </div>

        <div>
          <label for="end">Scheduled End</label>
          <input name="scheduleTime.e" type="time" value="${ session.scheduledTime.end?.toISOTime() }"/>
        </div>
      </div>

      <input type="hidden" name="scheduledTime.isLuxonInterval" value="true"/>

      <li>Calendar date/time selectors for scheduled start and end</li>
      <li>game selector/editor (drop down on available games from the ledger)</li>
      <li>submit changes button that responds to if the above inputs have been altered</li>

      <button type="submit">Update Session Details</button>
    </form>
  `;
}