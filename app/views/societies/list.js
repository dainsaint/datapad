import { map } from "../../core/utils.js";
import SocietyCard from "./card.js";

export default function SocietyList({ session }) {
  return `
    <div id="society-card-list" class="stack" hx-get="${ session.toURL('/societies?view=list') }" hx-trigger="sse:societies">
      ${map(session.societies, society => SocietyCard({society}))}
    </div>
  `;
}