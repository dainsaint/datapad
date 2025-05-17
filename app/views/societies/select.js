import { html } from "#core/utils";
import Episode from "#models/episode";
import Icon from "#views/ui/icon";
import Toolbar from "#views/ui/toolbar";

export default function SocietySelect ({ episode = new Episode(), societyId = undefined } = {}) {
  const currentSociety = societyId ? episode.getSocietyById( societyId ) : episode.societies.at(0);
  return Toolbar({
    id: "society-select",
    class: "toolbar-rounded",
    links: episode.societies.map( society => ({ 
      href: society.toURL("/view"),
      push: episode.toURL('/facilitator/' + society.id),
      content: Icon.forArchetype( society.archetype ),
      isActive: society == currentSociety
    }))
  })
}