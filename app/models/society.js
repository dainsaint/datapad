import Model from "../core/model.js";

export default class Society extends Model {
  name = "";
  archetype = "";
  planet = "";
  communities = [];

  constructor({name, archetype = "", planet = ""}) {
    super();
    this.name = name;
    this.archetype = archetype;
    this.planet = planet;
  }

  get resources() {
    return this.communities.map( community => community.resources ).flat();
  }
}
