import Model from "../core/model.js";

export default class Society extends Model {
  name = "";
  archetype = "";
  planet = "";
  communities = [];

  constructor(name) {
    super();
    this.name = name;
  }

}
