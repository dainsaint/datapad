import Model from "../core/model.js";

export default class Session extends Model {
  date = new Date();
  societies = [];
  rounds = [];
  currentRound = 0;

  renderList() {
    return `
      <div data=id="${this._id}">
        ${ this.date.toString() } • Round ${ this.currentRound + 1 }
        <h4>Societies</h4>
        <div>
          ${ this.societies.map( society => society.renderList() )}
        </div>
      </div>
    `
  }
}
