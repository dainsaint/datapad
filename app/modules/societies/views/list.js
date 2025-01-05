import { html } from "#core/utils";
import SocietyCard from "./card.js";

export default function SocietyList({ episode }) {
  return html`
    <div id="society-card-list" class="stack" hx-get="${ episode.toURL('/societies/list') }" hx-trigger="sse:societies">
      ${ episode.societies.map( society => SocietyCard({society}) )}
    </div>
  `;
}