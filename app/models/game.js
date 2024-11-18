import Model from "../core/model.js";
import Session from "./session.js";

export default class Game extends Model {
  name = "";
  date = new Date();
  sessions = [];
  players = [];

  constructor(name) {
    super();
    this.name = name;
  }
}