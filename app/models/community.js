import Tags from "../core/tags.js";
import SessionModel from "./session-model.js";

export default class Community extends SessionModel {
  name;
  voice;
  resources = [];
  tags = new Tags();

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
    return `/sessions/${this.session}/communities/${this.id}` + append;
  }
}

export const CommunityVoice = {
  LEADER: "leader",
  PEOPLE: "people",
};

export const CommunityTag = {
  ENDANGERED: "endangered",
  LOST: "lost",
};
