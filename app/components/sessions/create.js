import { map } from "../../core/utils.js";
import Ledger from "../../models/ledger.js";
import Session from "../../models/session.js";

export default function SessionCreate({ session = new Session() } = {}) {
  const games = Ledger.games;
  
  return `
    <form hx-post="${session.toURL()}" class="stack">
      <h1>New Session (borked)</h1>
      <label for="name">Session Name</label>
      <input name="name" type="text"/>

      <label for="game">Game (Optional)</label>
      <input list="games-available" name="game" />
      <datalist id="games-available">
        ${map(games, (game) => `<option value=${game.id}>${game.name}</option>`)}
      </datalist>

      <label for="date">Date</label>
      <input name="date" type="date" value="${new Date().toISOString()}"/>

      <div class="grid-two">
        <div>
          <label for="start">Scheduled Start</label>
          <input name="scheduledTime.s" type="time" value=""/>
        </div>

        <div>
          <label for="end">Scheduled End</label>
          <input name="scheduleTime.e" type="time" value=""/>
        </div>
      </div>

      <input type="hidden" name="scheduledTime.isLuxonInterval" value="true"/>

      <li>Calendar date/time selectors for scheduled start and end</li>
      <li>game selector/editor (drop down on available games from the ledger)</li>
      <li>submit changes button that responds to if the above inputs have been altered</li>

      <button type="submit">+ New Session</button>
      <button type="button" value="cancel">Cancel</button>
    </form>
  `;
}