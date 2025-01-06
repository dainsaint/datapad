import { EpisodeModel } from "./episode";

export default class Society extends EpisodeModel {
  name = "";
  archetype = "";
  planet = "";
  communities = [];

  constructor({
    name = "New Society",
    archetype = "None",
    planet = "Earth",
  } = {}) {
    super();
    Object.assign(this, { name, archetype, planet });
  }

  getCommunityById(id) {
    return this.communities.find((r) => r.id === id);
  }

  addCommunity(community) {
    this.communities.push(community);
  }

  removeCommunity(community) {
    const index = this.communities.indexOf(community);
    if (index >= 0) {
      this.communities.splice(index, 1);
    }
  }

  getAllResources() {
    return this.communities.map((community) => community.resources).flat();
  }

  toURL(append = "") {
    return `/episodes/${this.episode}/societies/${this.id}` + append;
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