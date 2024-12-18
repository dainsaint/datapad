import SessionModel from "./session-model.js";

export default class Society extends SessionModel {
  name = "";
  archetype = "";
  planet = "";
  communities = [];

  constructor({ name = "", archetype = "", planet = "" }) {
    super();
    Object.assign(this, { name, archetype, planet });
  }

  addCommunity(community) {
    this.communities.push(community);
  }

  getAllResources() {
    return this.communities.map((community) => community.resources).flat();
  }

  toURL(append = "") {
    return `/sessions/${this.session}/societies/${this.id}` + append;
  }
}

export const SocietyArchetype = {
  AESTHETIC: "the aesthetic",
  CURIOUS: "the curious",
  ENTERPRISE: "the enterprise",
  FAITHFUL: "the faithful",
  GROUNDED: "the grounded",
  INTREPID: "the intrepid",
  MIGHTY: "the mighty",
  SCHOLARS: "the scholars",
};