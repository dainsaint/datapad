import Database from "./core/database.js";
import Game from "./models/game.js";
import Player from "./models/player.js";
import Society from "./models/society.js";
import Session from "./models/session.js";
import Community from "./models/community.js";
import Resource from "./models/resource.js";
import Phase from "./models/phase.js";

export function populateDummyData() {

  const database = new Database("data.json");

  database.update((data) => {
    data.games = [];
    const game = new Game("Arch St. - July 2024");
    data.games.push(game);

    const session = new Session();
    session.phases.push(
      new Phase("Global Phase", 0, 1200),
      new Phase("Universal Phase", 0, 240),
      new Phase("Societal Phase", 0, 600),
      new Phase("Galactic Phase", 0, 600),
      new Phase("Individual Phase", 0, 500),
      new Phase("Universal Phase", 1, 240),
      new Phase("Societal Phase", 1, 600),
      new Phase("Galactic Phase", 1, 600),
      new Phase("Individual Phase", 1, 500),
      new Phase("Universal Phase", 2, 240),
      new Phase("Societal Phase", 2, 600),
      new Phase("Galactic Phase", 2, 600),
      new Phase("Individual Phase", 2, 500),
      new Phase("Universal Phase", 3, 240),
      new Phase("Societal Phase", 3, 600),
      new Phase("Galactic Phase", 3, 600),
      new Phase("Generational Phase", 3, 500),
      new Phase("Conclusion Phase", 3, 500)
    );

    data.sessions = {};
    data.sessions[game._id] ??= [];
    data.sessions[game._id].push(session);

    game.sessions.push(session.toReference());

    const society = new Society("The Willow Whompers");
    society.archetype = "The Mighty";
    session.societies.push(society);

    data.societies = {};
    data.societies[game._id] ??= {};
    data.societies[game._id][session._id] ??= [];
    data.societies[game._id][session._id].push(society);

    const community = new Community("Venerable Elders");
    society.communities.push(community);

    data.communities = {};
    data.communities[society._id] ??= [];
    data.communities[society._id].push(community);

    const resource1 = new Resource("Green Sludge");
    const resource2 = new Resource("Amazing Suspenders");
    const resource3 = new Resource("Big Rock");
    community.resources.push(resource1);
    community.resources.push(resource2);
    community.resources.push(resource3);

    data.resources = {};
    data.resources[community._id] ??= [];
    data.resources[community._id].push(resource1);
    data.resources[community._id].push(resource2);
    data.resources[community._id].push(resource3);

    const player = new Player("Ving Rhames");
    game.players.push(player.toReference("name"));
    session.players.push(player.toReference("name"));

    data.players = {};
    data.players[game._id] ??= [];
    data.players[game._id].push(player);
  });

}