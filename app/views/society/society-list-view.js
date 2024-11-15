import View from "../../core/view.js";

export default class SocietyListView extends View {
  render(society) {
    return `
      <div data=id="${society._id}">
        ${society.name}
      </div>
    `;
  }
}
