import { html, pluralize } from "#core/utils";
import Icon from "#views/ui/icon";

export default function Home ({ games = new Array(), episodes = new Array() }) {
  return html`
    <main id="home">
      <div class="top">
        ${Icon("spop")}
      </div>

      <div class="content stack scrollable">
        <div>Space Opera Datapad v0.1-alpha</div>

        <details>
          <summary><h2>Load Episode</h2></summary>
          ${ episodes.map( (episode) =>
            html`<a href="/episodes/${episode.id}">${episode.name} • ${episode.date.toISODate()}</a>`
          )}
        </details>

        <h2 hx-get="/episodes/create" hx-target="#dialog">New Episode</h2>
        
        <details>
          <summary><h2>View Games</h2></summary>
          ${games.map( (game) =>
            html`<a href="${game.toURL("/overview")}">${game.name} • ${game.episodes.length} ${pluralize(game.episodes.length, "episode")}</a>`
          )}
        </details>  
      </div>
    </main>

    ${ styles() }
  `;
}


//todo -> get this in the head where it belongs, or decompose
export function styles() {
  return html`
    <style>
      #home {
        --color-bg: black;
        --color-text: white;
        background: black;
        color: white;
        display: grid;
        grid-template-rows: 50% 50%;
        /* inset: 0px; */
        /* position: absolute; */
        width: 100%;
        height: 100%;
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
      }

      .top .icon {
        margin: 1px auto;
        width: 400px;
        height: 400px;
      }

      h2 {
        border: 1px solid white;
        width: 300px;
        padding: 10px;
        margin: 0px auto;
      }

      details a {
        border: 1px solid white;
        border-bottom: none;
        padding: 10px;
        width: 300px;
        margin: 0px auto;
        display: block;
        font-size: 1rem;
        color: white;
        text-decoration: none;
      }

      details a:last-child {
        border-bottom: 1px solid white;
      }

      details a:hover {
        background: var(--color-dark);
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