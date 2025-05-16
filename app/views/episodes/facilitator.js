import { html } from "#core/utils";
import SocietyPanel from "#views/societies/panel";
import EpisodeLayout from "#views/episodes/components/layout";
import Episode from "#models/episode";

export default function EpisodeFacilitator ({ episode = new Episode(), societyId = undefined } = {}) {
  const currentSociety = societyId ? episode.getSocietyById( societyId ) : episode.societies.at(0);
  const content = html`
    ${ currentSociety ? SocietyPanel({ society: currentSociety }) : NoSocieties({episode}) }
  `;

  return EpisodeLayout({ episode }, content);
}

function NoSocieties({episode}) {
  return html`
    <main class="content stack-loose">
      <h1>No Societies Yet</h1>
      <button hx-get="${episode.toURL('/societies/create')}" hx-target="#dialog">+ Create a new society</button>
    </main>
  `;
}