import Model from "#database/model";

export default class Record extends Model {
  timestamp;
  type = RecordType.NONE;
  description;
  value;
  
  constructor(data){
    super(data);
    this.timestamp = new Date();
    this.update(data);
  }

  toLog() {
    return [this.type, this.description, this.value].join(', ');
  }

  toURL(append = "") {
    return `/records/${this.episode.id}/${this.id}` + append;
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

  EPISODE_COMMUNITIES_ENDANGERED: "CommunitiesEndangered",
  EPISODE_COMMUNITIES_LOST: "CommunitiesLost",

  PHASE_STARTED: "PhaseStarted",
  PHASE_ENDED: "PhaseEnded",
  PHASE_DURATION: "PhaseDuration",

  ROUND_STARTED: "RoundStarted",
  ROUND_ENDED: "RoundEnded"
}