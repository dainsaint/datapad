import View from "../../core/view.js";
import SocietyListView from "../society/society-list-view.js";

export default class SessionListView extends View {
  render(session) {
    const societyListView = new SocietyListView();
    return `
      <div data=id="${session._id}">
        ${session.date.toString()} • Round ${session.currentRound + 1}
        <h4>Societies</h4>
        <div>
          ${session.societies.map( societyListView.render )}
        </div>
      </div>
    `;
  }
}