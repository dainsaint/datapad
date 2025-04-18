import Tags from "#core/tags";
import EpisodeModel from "#database/episode-model"

export default class Community extends EpisodeModel {
  name;
  voice;
  resources = [];
  tags = new Tags();

  playerId;

  constructor({ name = "", voice = CommunityVoice.PEOPLE }) {
    super();
    Object.assign(this, { name, voice });
  }

  get isEndangered() {
    return this.resources.length == 0;
  }

  getResourceById(id) {
    return this.resources.find((r) => r.id === id);
  }

  addResource(resource) {
    this.resources.push(resource);
  }

  removeResource(resource) {
    const index = this.resources.indexOf(resource);
    if (index >= 0) {
      this.resources.splice(index, 1);
    }
  }

  toURL(append = "") {
    return `/episodes/${this.episode.id}/communities/${this.id}` + append;
  }
}

export const CommunityVoice = {
  LEADER: "leader",
  PEOPLE: "people",
};

export const CommunityRole = {
  NONE: "none",
  EMISSARY: "emissary",
  AMBASSADOR: "ambassador",
};

export const CommunityTag = {
  ENDANGERED: "endangered",
  LOST: "lost",
};
