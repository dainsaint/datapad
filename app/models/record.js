import EpisodeModel from "#database/episode-model"

export default class Record extends EpisodeModel {
  timestamp = new Date();
  type = RecordType.NONE;
  description = "New Record";
  value;
  
  constructor({} ){
    super();
    this.timestamp = new Date();
  }

  toURL(append = "") {
    return `/episodes/${this.episodeId}/phases/${this.id}` + append;
  }

}

export const RecordType = {
  NONE: "None",

  RESOURCE_CREATED: "ResourceCreated",
  RESOURCE_TRANSFORMED: "ResourceTransformed",
  RESOURCE_EXHAUSTED: "ResourceExhausted",
  RESOURCE_DESTROYED: "ResourceDestroyed",

  SOCIETY_RESOURCES: "SocietyResources",
  SOCIETY_ACTIONS_TAKEN: "SocietyActionsTaken",

  COMMUNITY_ENDANGERED: "CommunityEndangered",
  COMMUNITY_LOST: "CommunityLost",
  COMMUNITY_CREATED: "CommunityCreated",
  COMMUNITY_RESOURCES: "CommunityResources",
  
  ACTION_RESOURCES: "ActionResources",

  EPISODE_CRISIS_MODE_BEGAN: "EpisodeCrisisModeBegan",
  EPISODE_CRISIS_MODE_ENDED: "EpisodeCrisisModeEnded",
  EPISODE_COMMUNITIES_ENDANGERED: "CommunitiesEndangered",
  EPISODE_COMMUNITIES_LOST: "CommunitiesLost",

  PHASE_STARTED: "PhaseStarted",
  PHASE_ENDED: "PhaseEnded",

  ROUND_STARTED: "RoundStarted",
  ROUND_ENDED: "RoundEnded"
}