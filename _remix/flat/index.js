import { map, pluralize } from "#core/utils";
import Ledger from "#models/ledger";
import Icon from "#views/ui/icon";


export async function get(req) {
  const games = Ledger.games;
  const episodes = Ledger.episodes;

  //TODO: Design the actual landing page: https://github.com/dainsaint/datapad/issues/39
  return { games, episodes };
};


export default function Home ({ games = new Array(), episodes = new Array() }) {
  return `
    <main id="home">
      <div class="top">
        ${Icon("spop")}
        <div>Space Opera Datapad v0.1-alpha</div>
      </div>

      <div class="content stack">
        <details>
          <summary><h2>Load Episode</h2></summary>
          <ul>
          ${map(
            episodes,
            (episode) =>
              `<li><a href="/episodes/${episode.id}">${episode.name} • ${episode.date.toISODate()}</a></li>`
          )}
          </ul>
        </details>

        <h2 hx-get="/episodes" hx-target="#dialog">New Episode</h2>
        
        <details>
          <summary><h2>View Games</h2></summary>
          <ul>
          ${map(
            games,
            (game) =>
              `<li><a href="${game.toURL()}">${game.name} • ${game.episodes.length} ${pluralize(game.episodes.length, "episode")}</a></li>`
          )}
          </ul>
        </details>  
      </div>
    </main>
    <style>
      #home {
        --color-bg: black;
        --color-text: white;
        background: black;
        color: white;
        display: grid;
        grid-template-rows: 60% 40%;
        inset: 0px;
        position: absolute;
        align-items: stretch;
        justify-items: stretch;
        text-align: center;
      }

      h2 {
        cursor: pointer;
      }

      .top {
        display: grid;
        align-content: end;
        .icon {
          margin: 1px auto;
          width: 400px;
          height: 400px;
        }
      }

      h2 {
        border: 1px solid white;
        width: 300px;
        padding: 10px;
        margin: 0px auto;
      }

      ul {
        padding: 0px;
        width: 300px;
        margin: 0px auto;

        li {
          list-style: none;
          margin: 0px;

          a {
            border: 1px solid white;
            padding: 10px;
            display: block;
            font-size: 1rem;
            color: white;
            text-decoration: none;

            &:hover {
              background: var(--color-dark); 
            }
          }
        }
      }

      details {
        -webkit-user-select: none;
      }

      details > summary {
        list-style: none;
      }

      details[open] h2 {
        background: var(--color-text);
        color: var(--color-bg);
      }

      details > summary::-webkit-details-marker {
        display: none;
      }

    </style>
  `;
}