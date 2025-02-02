import { html } from "#core/utils";
import Ledger from "#database/ledger";
import Episode from "#models/episode";


export default function EpisodeEdit({ episode = new Episode() } = {}) {
  const games = Ledger.games;
  
  return html`
    <form hx-post="${episode.toURL()}" class="stack">
      Other info about the episode timing goes here. 
      <li>This should be a form</li>
      
      <input name="id" type="hidden" value="${episode.id}"/>

      <label for="name">Episode Name</label>
      <input name="name" autofocus autocapitalize="words" type="text" value="${episode.name}"/>

      <label for="game">Game (Optional)</label>
      <input list="games-available" name="game" />
      <datalist id="games-available">
        ${ games.map( game => `<option value=${game.id}>${game.name}</option>`) }
      </datalist>

      <label for="date">Date</label>
      <input name="date" type="date" value="${ episode.date.toISODate() }"/>

      <div class="grid-two">
        <div>
          <label for="start">Scheduled Start</label>
          <input name="scheduledTime[s]" type="time" value="${ episode.scheduledTime.start?.toISOTime() }"/>
        </div>

        <div>
          <label for="end">Scheduled End</label>
          <input name="scheduledTime[e]" type="time" value="${ episode.scheduledTime.end?.toISOTime() }"/>
        </div>
      </div>

      <input type="hidden" name="scheduledTime[isLuxonInterval]" value="true"/>

      <li>Calendar date/time selectors for scheduled start and end</li>
      <li>game selector/editor (drop down on available games from the ledger)</li>
      <li>submit changes button that responds to if the above inputs have been altered</li>

      <button type="submit">Update Episode Details</button>
    </form>
  `;
}