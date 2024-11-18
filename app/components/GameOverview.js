export default function GameOverview (game) {
  return `
    <div class="game-overview">
      <h1>${game.name}</h3>
      <a href="/">View All</a><br/>
      <hr/>

      <h2>Sessions</h2>
      <ul class="game-overview__section">
        ${game.sessions.map( (session) => `<li><a href="/game/${game._id}/session/${session._id}">bleh</a></li>`)}
      </ul>
      <hr/>
      <h2>Players</h2>
      <ul>
        ${game.players.map((player) => `<li>${player.name}</li>`).join("\n")}
      </ul>
    </div>
  `;
}