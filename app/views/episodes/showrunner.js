import { from, html, secondsToTime } from "#core/utils";
import EpisodeLayout from "#views/episodes/components/layout";
import EpisodeEdit from "#views/episodes/edit";
import Episode from "#models/episode";

export default function EpisodeShowrunner ({ episode = new Episode(), societyId = undefined } = {}) {

  const hourStart = episode.scheduledTime.start.hour;
  const hourEnd = episode.scheduledTime.end.hour;
  const episodeDuration = (hourEnd - hourStart) * 60 * 60; //episode.scheduledTime.toDuration("seconds");
  const hourSpan = hourEnd - hourStart;
  const displayStart = hourStart - 2;
  const displayEnd = hourEnd + 2;

  const rounds = episode.phases.reduce( (rounds, phase) => {
    const round = rounds.at(phase.round) || {
      round: phase.round,
      duration: 0,
    }

    round.duration += phase.duration;
    if( rounds.length < phase.round + 1)
      rounds.push(round);

    return rounds;
  }, [])

  console.log( rounds );

  const content = html`
    <main class="content stack-loose scrollable">
      <h1>Showrunner</h1>

      <div class="grid-two">


        <div>
          ${ EpisodeEdit({episode}) }
        </div>
        
        <div class="calendar">
          ${ from(displayStart).to(displayEnd - 1).map( i => 
            html`<div class="calendar-hour" style="grid-area: ${i - displayStart + 1} / 1">${i}:00</div>`
          )}

          <div 
            class="calendar-duration" 
            style="
              grid-area: ${hourStart - displayStart + 1} / 1 / ${hourEnd - displayStart + 1} / 1;
              --episode-duration: ${episodeDuration};
              "
          >
            ${ rounds.map( round => 
              html`<div 
                class="calendar-phase" 
                style="--phase-duration: ${round.duration}"
              >
              Round ${ round.round } (${secondsToTime(round.duration)})
              </div>`
            )}
        </div>

        </div>

      </div> 

      <style>
        .calendar {
          border: 1px solid black;
          height: 80vh;
          display: grid;
        }

        .calendar-hour {
          border: 1px solid #eee;
        }

        .calendar-duration {
          background: rgba(0,0,0,.1);
        }

        .calendar-phase {
          border: 1px solid white;
          background: rgba(0,0,255,.5);
          color: white;
          height: calc( var(--phase-duration) / var(--episode-duration) * 100%);
        }
      </style>
    </main>
  `;

  return EpisodeLayout({ episode }, content);
}

