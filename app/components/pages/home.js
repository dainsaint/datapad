import { map, pluralize } from "../../core/utils.js";
import Icon from "../ui/Icon.js";

export default function Home ({ games = new Array(), sessions = new Array() }) {
  return `
    <main id="home">
      <div class="top">
        ${Icon("spop")}
        <div>Space Opera Datapad v0.1-alpha</div>
      </div>

      <div class="content stack">
        <details>
          <summary><h2>Load Session</h2></summary>
          <ul>
          ${map(
            sessions,
            (session) =>
              `<li><a href="/sessions/${session.id}">${
                session.name
              } • ${session.date.toISODate()}</a></li>`
          )}
          </ul>
        </details>

        <h2 hx-get="/sessions" hx-target="#dialog" >New Session</h2>
        
        <details>
          <summary><h2>View Games</h2></summary>
          <ul>
          ${map(
            games,
            (game) =>
              `<li><a href="${game.toURL()}">${game.name} • ${
                game.sessions.length
              } ${pluralize(game.sessions.length, "session")}</a></li>`
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