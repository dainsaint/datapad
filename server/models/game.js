import Model from "./model.js";
import Session from "./session.js";

export default class Game extends Model {
  date = new Date();
  sessions = [];
  players = [];

  constructor() {
    super();
    this.sessions.push(new Session());
  }

  start() {
    console.log("Start game");
  }
}