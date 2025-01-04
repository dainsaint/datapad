import { DateTime } from "luxon";
import Community, { CommunityVoice } from "#modules/communities/model";
import Episode from "#modules/episodes/model";
import Game from "#modules/games/model";
import Phase from "#modules/phases/model";
import Player from "#modules/players/model";
import Resource from "#modules/resources/model";
import Society, { SocietyArchetype } from "#modules/societies/model";

export function populateDummyData() {

  const episode = new Episode({
    date: DateTime.now(),
    name: "A Sample Episode"
  });

  episode.addPhase(new Phase({ name: "Global Phase",       round: 0, duration: 1200 }))
  episode.addPhase(new Phase({ name: "Universal Phase",    round: 0, duration: 240 }))
  episode.addPhase(new Phase({ name: "Societal Phase",     round: 0, duration: 600 }))
  episode.addPhase(new Phase({ name: "Galactic Phase",     round: 0, duration: 600 }))
  episode.addPhase(new Phase({ name: "Individual Phase",   round: 0, duration: 500 }))
  episode.addPhase(new Phase({ name: "Universal Phase",    round: 1, duration: 240 }))
  episode.addPhase(new Phase({ name: "Societal Phase",     round: 1, duration: 600 }))
  episode.addPhase(new Phase({ name: "Galactic Phase",     round: 1, duration: 600 }))
  episode.addPhase(new Phase({ name: "Individual Phase",   round: 1, duration: 500 }))
  episode.addPhase(new Phase({ name: "Universal Phase",    round: 2, duration: 240 }))
  episode.addPhase(new Phase({ name: "Societal Phase",     round: 2, duration: 600 }))
  episode.addPhase(new Phase({ name: "Galactic Phase",     round: 2, duration: 600 }))
  episode.addPhase(new Phase({ name: "Individual Phase",   round: 2, duration: 500 }))
  episode.addPhase(new Phase({ name: "Universal Phase",    round: 3, duration: 240 }))
  episode.addPhase(new Phase({ name: "Societal Phase",     round: 3, duration: 600 }))
  episode.addPhase(new Phase({ name: "Galactic Phase",     round: 3, duration: 600 }))
  episode.addPhase(new Phase({ name: "Generational Phase", round: 3, duration: 500 }))
  episode.addPhase(new Phase({ name: "Conclusion Phase",   round: 3, duration: 500 }))



  const player = new Player({
    name: "Ving Rhames",
  });

  const society = new Society({
    name: "Ten Thousand Islands",
    archetype: SocietyArchetype.CURIOUS,
    planet: "Jorun",
  });

  const community = new Community({
    name: "Venerable Elders",
    voice: CommunityVoice.LEADER,
  });

  const community2 = new Community({
    name: "Disaffected Youth",
    voice: CommunityVoice.PEOPLE,
  });


  const resource1 = new Resource({ name: "Green Sludge" });
  const resource2 = new Resource({ name: "Amazing Suspenders" });
  const resource3 = new Resource({ name: "Big Rock" });

  community.addResource(resource1);
  community.addResource(resource2);
  community.addResource(resource3);

  society.addCommunity(community);
  society.addCommunity(community2);

  episode.addPlayer(player);
  episode.addSociety(society);
  episode.addCommunity(community);
  episode.addCommunity(community2);
  episode.addResource(resource1);
  episode.addResource(resource2);
  episode.addResource(resource3);

  episode.makeActive();

  const game = new Game({
    name: "John's House — Feb-Mar 2025",
  });

  episode.game = game;

  episode.save();
}