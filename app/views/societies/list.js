import { map } from "../../core/utils.js";
import SocietyCard from "./card.js";

export default function SocietyList({ episode }) {
  return `
    <div id="society-card-list" class="stack" hx-get="${ episode.toURL('/societies') }" hx-trigger="sse:societies">
      ${map(episode.societies, society => SocietyCard({society}))}
    </div>
  `;
}