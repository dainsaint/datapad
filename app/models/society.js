import Model from "#database/model";

export default class Society extends Model {
  name
  archetype
  planet

  constructor(data) {
    super(data);
    this.update(data);
  }


  get communities() {
    return this.episode.communities.filter( community => community.societyId == this.id );
  }

  get resources() {
    return this.communities.map( community => community.resources ).flat();
  }


  toURL(append = "") {
    return `/episodes/${this.episode.id}/societies/${this.id}` + append;
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

export const SocietyTags = {
  INSPIRED: "inspired"
}