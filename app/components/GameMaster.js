import SessionOverview from "./SessionOverview.js";
import LayoutToolbar from "./LayoutToolbar.js";

export default function GameMaster( session ) {
    const content = `
      ${SessionOverview(session)}
    `;

    return LayoutToolbar(session, content);
}