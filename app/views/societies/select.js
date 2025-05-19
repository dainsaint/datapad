import { html } from "#core/utils";
import Icon from "#views/ui/icon";
import Toolbar from "#views/ui/toolbar";

export default function SocietySelect ({ society: currentSociety } = {}) {

  return html`
    <div>
      ${ Toolbar({
        id: "society-select",
        class: "toolbar-rounded is-size-5",
        links: currentSociety.episode.societies.map( society => ({ 
          href: society.episode.toURL('/facilitator/' + society.id),
          content: Icon.forArchetype( society.archetype ),
          isActive: society == currentSociety
        }))
      })}
    </div>
  `
}