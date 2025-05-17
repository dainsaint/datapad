import Icon from "#views/ui/icon";
import Toolbar from "#views/ui/toolbar";

export default function SocietySelect ({ society: currentSociety } = {}) {

  return Toolbar({
    id: "society-select",
    class: "toolbar-rounded",
    links: currentSociety.episode.societies.map( society => ({ 
      href: society.episode.toURL('/facilitator/' + society.id),
      content: Icon.forArchetype( society.archetype ),
      isActive: society == currentSociety
    }))
  })
}