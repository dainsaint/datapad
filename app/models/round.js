import Model from "../core/model.js";
import Phase from "./phase.js";
import Session from "./session.js";

export default class Round extends Model {
  
  number = 1;
  phases = [];

  constructor() {
    super();
    this.phases.push(new Phase("Universal Phase", 240));
    this.phases.push(new Phase("Societal Phase", 600));
    this.phases.push(new Phase("Galactic Phase", 600));
    this.phases.push(new Phase("Individual Phase", 500));
  }
}
