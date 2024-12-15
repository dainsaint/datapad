import moment from "moment";
import { map, pluralize } from "../../core/utils.js";

export default function Home ({ games, sessions = [] }) {
  console.log( games );
  return `
    <main class="content stack">
      <h1>Datapad</h1>
      <h2>Sessions</h2>
      ${map(sessions, session => `<li><a href="/sessions/${session.id}">${session.name} • ${moment(session.date).format("YYYY-MM-DD") }</a></li>`)}
      <h2>Games</h2>
      ${map(games, game => `<li><a href="${ game.toURL() }">${game.name} • ${game.sessions.length} ${ pluralize( game.sessions.length, "session") }</a></li>`)}
    </main>
  `;
}