import Episode from "#models/episode";
import Icon from "#views/ui/icon";
import Toolbar from "#views/ui/toolbar";
import { request } from "../../../app.js";

export default function EpisodeToolbar({ episode = new Episode() } = {}) {
  const links = [
    { href: episode.toURL('/facilitator'),  content: Icon("planet")  },
    { href: episode.toURL('/gm'),           content: Icon("dice") },
    { href: episode.toURL('/showrunner'),   content: Icon("playlist")  },
    { href: episode.toURL('/documents'),    content: Icon("script")  },
    { href: episode.toURL('/settings'),     content: Icon("gears")  },
  ]

  links.forEach( link => link.isActive = link.href != "/" && request.path.includes(link.href) )

  return Toolbar({
    id: "episode-toolbar",
    class: "ribbon",
    links
  })
}