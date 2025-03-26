import { DateTime } from "luxon";
import Community, { CommunityVoice } from "#models/community";
import Episode from "#models/episode";
// import Game from "#models/game";
import Phase, {PhaseType} from "#models/phase";
import Player from "#models/player";
import Resource from "#models/resource";
import Society, { SocietyArchetype } from "#models/society";

export function populateDummyData() {

  const episode = new Episode({
    date: DateTime.now(),
    name: "A Sample Episode"
  });

  episode.addPhase(new Phase({ type: PhaseType.SETUP,       round: 0, duration: 1200 }))
  episode.addPhase(new Phase({ type: PhaseType.UNIVERSAL,    round: 1, duration: 240 }))
  episode.addPhase(new Phase({ type: PhaseType.SOCIETAL,     round: 1, duration: 600 }))
  episode.addPhase(new Phase({ type: PhaseType.GALACTIC,     round: 1, duration: 600 }))
  episode.addPhase(new Phase({ type: PhaseType.INDIVIDUAL,   round: 1, duration: 495 }))
  episode.addPhase(new Phase({ type: PhaseType.UNIVERSAL,    round: 2, duration: 240 }))
  episode.addPhase(new Phase({ type: PhaseType.SOCIETAL,     round: 2, duration: 600 }))
  episode.addPhase(new Phase({ type: PhaseType.GALACTIC,     round: 2, duration: 600 }))
  episode.addPhase(new Phase({ type: PhaseType.INDIVIDUAL,   round: 2, duration: 495 }))
  episode.addPhase(new Phase({ type: PhaseType.UNIVERSAL,    round: 3, duration: 240 }))
  episode.addPhase(new Phase({ type: PhaseType.SOCIETAL,     round: 3, duration: 600 }))
  episode.addPhase(new Phase({ type: PhaseType.GALACTIC,     round: 3, duration: 600 }))
  episode.addPhase(new Phase({ type: PhaseType.INDIVIDUAL,   round: 3, duration: 495 }))
  episode.addPhase(new Phase({ type: PhaseType.UNIVERSAL,    round: 4, duration: 240 }))
  episode.addPhase(new Phase({ type: PhaseType.SOCIETAL,     round: 4, duration: 600 }))
  episode.addPhase(new Phase({ type: PhaseType.GALACTIC,     round: 4, duration: 600 }))
  episode.addPhase(new Phase({ type: PhaseType.GENERATIONAL, round: 4, duration: 495 }))
  episode.addPhase(new Phase({ type: PhaseType.CONCLUSION,   round: 4, duration: 495 }))



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

  resource1.communityId = community.id;
  resource2.communityId = community.id;
  resource3.communityId = community.id;

  community.societyId = society.id;
  community2.societyId = society.id;

  episode.addPlayer(player);
  episode.addSociety(society);
  episode.addCommunity(community);
  episode.addCommunity(community2);
  episode.addResource(resource1);
  episode.addResource(resource2);
  episode.addResource(resource3);

  episode.save();
}



  // episode.makeActive();

  // const game = new Game({
  //   name: "John's House — Feb-Mar 2025",
  // });

  // episode.game = game;

//   episode.save();
// 