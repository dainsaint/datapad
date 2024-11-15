import Model from "../core/model.js";
import Session from "./session.js";

export default class Game extends Model {
  name = "";
  date = new Date();
  sessions = [];
  players = [];

  constructor() {
    super();
    this.sessions.push(new Session());
  }

  renderFull() {
    return `
      <div>
        <em>${ this._id }</em>
        <a href="/">View All</a><br/>
        <h3>Sessions</h3>
        <div>
          ${ this.sessions.map( session => session.renderList() )}
        </div>
        <h3>Players</h3>
      </div>
    `
  }
}