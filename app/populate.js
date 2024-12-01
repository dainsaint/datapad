import Phase from "./models/phase.js";

import {
  addCommunityToSociety,
  addPlayerToSession,
  addResourceToCommunity,
  addSessionToGame,
  addSocietyToSession,
  createCommunity,
  createGame,
  createPlayer,
  createResource,
  createSession,
  createSociety,
  makeActiveSession,
} from "./core/data-access-layer.js";

export function populateDummyData() {


  const game = createGame({name: "ExCITE Center - October 2024"});
  const session = createSession({name: "Hi there", date: new Date("July 15, 2024")});

  //TODO: get this in the update cycle
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

  //if the session is associated with a game, update that bidirectionally
  addSessionToGame(session, game);

  const society = createSociety({name: "The Willow Whompers", archetype: "the mighty"});
  addSocietyToSession(society, session);

  const community = createCommunity({name: "Venerable Elders", voice: "leader"});
  addCommunityToSociety(community, society);

  const community2 = createCommunity({name: "Disaffected Youth", voice: "people"});
  addCommunityToSociety(community2, society);

  
  const resource1 = createResource({name: "Green Sludge"});
  const resource2 = createResource({name: "Amazing Suspenders"});
  const resource3 = createResource({name: "Big Rock"});

  addResourceToCommunity(resource1, community);
  addResourceToCommunity(resource2, community);
  addResourceToCommunity(resource3, community);

  const player = createPlayer({name: "Ving Rhames", pronouns: ["he", "him"]});
  addPlayerToSession(player, session);

  makeActiveSession(session);
}