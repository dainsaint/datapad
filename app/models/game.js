import Model from "../core/model.js";

export default class Game extends Model {
  name = "";
  date = new Date();
  sessions = [];
  players = [];

  constructor({name, date = new Date()}) {
    super();
    this.name = name;
    this.date = date;
  }
}