import Model from "../core/model.js";

export default class Society extends Model {
  name = "";
  players = [];

  constructor(name) {
    super();
    this.name = name;
  }

  renderList() {
    return `
      <div data=id="${this._id}">
        ${ this.name }
      </div>
    `;
  }
}
