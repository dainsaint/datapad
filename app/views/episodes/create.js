import { html } from "#core/utils";
import { DateTime } from "luxon";

export default function EpisodeCreate({}) {
  const daysToAdd = DateTime.now().hour > 13 ? 1 : 0;
  const nextDefaultTime = DateTime.now().set({ hour: 13, minute: 0, second: 0 }).plus({ days: daysToAdd });

  return html`
    <form hx-post="/episodes" class="stack">
      <header>
        <h1>New Episode</h1>
      </header>

      <article class="stack">

      <label for="name">Episode Name</label>
      <input name="name" type="text" required/>

      ${ EpisodeTimeInput({ date: nextDefaultTime, time: nextDefaultTime, duration: {hours: 5, minutes: 0} }) }
      
      </article>

      <footer>
        <button type="submit">+ New Episode</button>
        <button type="button" value="cancel">Cancel</button>
      </footer>

    </form>
  `;
}

export function EpisodeTimeInput({ date, time, duration }) {
  const endTime = date.set({ hour: time.hour, minute: time.minute }).plus(duration);

  return html`
    <section class="stack-tight" hx-post="/episodes/create/time" hx-trigger="change" hx-swap="outerHTML">
      <div class="grid-three">
        <div>
          <label for="date">Date</label>
          <input name="date" type="date" value="${date.toISODate()}"/>
        </div>

        <div>
          <label for="start">Time</label>
          <input name="time" type="time" value="${time.toFormat('HH:mm')}"/>
        </div>

        <div>
          <label for="end">Duration</label>
          <div class="grid-two">
            <select name="duration[hours]">
              ${ [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map( hours =>
                html`<option ${{value: hours, selected: hours == duration.hours }}>${hours}h</option>`
              )}
            </select>

            <select name="duration[minutes]">
              ${ [0, 15, 30, 45].map( minutes =>
                html`<option ${{value: minutes.toString(), selected: minutes == duration.minutes }}>${minutes}m</option>`
              )}
            </select>
          </div>
        </div>
      </div>

      <div>
        This episode will take place ${date.toFormat("DDD")}
        from ${time.toFormat("h:mm a")}
        till ${endTime.toFormat("h:mm a")}.
      </div>
  </section>
  `
}


// <p class="error">${ errorsFor("name", errors) } </p>

// <label for="game">Series (Optional)</label>
// <input list="games-available" name="game" placeholder="No series selected"/>
// <datalist id="games-available">
//   ${map(games, (game) => `<option>${game.name}</option>`
//   )}
// </datalist>
// <p class="text">This will create a new game called 'NLEEB'</p>
