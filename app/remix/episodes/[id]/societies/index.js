import { map } from "#core/utils";
import Episode from "#models/episode";
import SocietyCard from "#views/societies/card";

export async function get( req ) {
  const { id } = req.params;
  const episode = Episode.load(id);
  return { episode }
};

export default function SocietyList({ episode }) {
  return `
    <div id="society-card-list" class="stack" hx-get="${ episode.toURL('/societies') }" hx-trigger="sse:societies">
      ${map(episode.societies, society => SocietyCard({society}))}
    </div>
  `;
}