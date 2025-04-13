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

  for( var i = 1; i <= 8; i++) {
    episode.addPhase(new Phase({ type: PhaseType.UNIVERSAL,    round: i, duration: 240 }))
    episode.addPhase(new Phase({ type: PhaseType.SOCIETAL,     round: i, duration: 10 * 60 }))
    episode.addPhase(new Phase({ type: PhaseType.GALACTIC,     round: i, duration: 3 * 4 * 60 }))
    episode.addPhase(new Phase({ type: PhaseType.INDIVIDUAL,   round: i, duration: 10 * 60 }))
  }
  
  episode.addPhase(new Phase({ type: PhaseType.CONCLUSION,   round: 9, duration: 495 }))
  episode.makeActive();
  episode.save();
}