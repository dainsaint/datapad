import { html } from "#core/utils";
import { DateTime } from "luxon";

export default function EpisodeCreate({}) {
  const daysToAdd = DateTime.now().hour > 13 ? 1 : 0;
  const nextDefaultTime = DateTime.now().set({ hour: 13, minute: 0, second: 0 }).plus({ days: daysToAdd });

  return html`
    <form hx-post="/episodes" class="stack">
      <header>
        <h1>New Episode (borked)</h1>
      </header>

      <article class="stack">

      <label for="name">Episode Name</label>
      <input name="name" type="text" required/>

      <div class="grid-three">
        <div>
          <label for="date">Date</label>
          <input name="date" type="date" value="${nextDefaultTime.toISODate()}"/>
        </div>

        <div>
          <label for="start">Time</label>
          <input name="time" type="time" value="${nextDefaultTime.toFormat('HH:mm')}"/>
        </div>

        <div>
          <label for="end">Duration</label>
          <div class="grid-two">
            <select name="duration[hours]">
              <option value="1">1h</option>
              <option value="2">2h</option>
              <option value="3">3h</option>
              <option value="4">4h</option>
              <option value="5" selected>5h</option>
              <option value="6">6h</option>
              <option value="7">7h</option>
              <option value="8">8h</option>
              <option value="9">9h</option>
              <option value="10">10h</option>
              <option value="11">11h</option>
              <option value="12">12h</option>
            </select>

            <select name="duration[minutes]">
              <option value="0" selected>0m</option>
              <option value="15">15m</option>
              <option value="30">30m</option>
              <option value="45">45m</option>
            </select>
          </div>
        </div>
      </div>
      
      <p class="text">This episode will take place ${nextDefaultTime.toFormat("DDD")} from ${nextDefaultTime.toFormat("h:mm a")} till ${nextDefaultTime.plus({ hours: 5 }).toFormat("h:mm a")}.</p>


      </article>

      <footer>
        <button type="submit">+ New Episode</button>
        <button type="button" value="cancel">Cancel</button>
      </footer>

    </form>
  `;
}


// <p class="error">${ errorsFor("name", errors) } </p>

// <label for="game">Series (Optional)</label>
// <input list="games-available" name="game" placeholder="No series selected"/>
// <datalist id="games-available">
//   ${map(games, (game) => `<option>${game.name}</option>`
//   )}
// </datalist>
// <p class="text">This will create a new game called 'NLEEB'</p>
