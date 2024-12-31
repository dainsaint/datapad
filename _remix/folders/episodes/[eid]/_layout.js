import Episode from "#models/episode";
import Phase from "#models/phase";
import PhaseTime from "#views/phases/time";
import Icon from "#views/ui/icon";

export default function EpisodeLayout(content) {
  return `
    <section class="layout-toolbar">
      ${EpisodeToolbar({  })}
      <div class="layout-column">
        ${EpisodeStatusBar({  })}
        ${content}
      </div>
    </section>
  `;
}

function EpisodeStatusBar ({ episode = new Episode() } = {}) {
  const activePhase = episode?.phases?.at( episode.currentRound ) || new Phase({ name: "No Phase", round: -1, duration: 0 })

  return `
  <nav class="status-bar layout-row color-contrast">
    ${ PhaseTime({phase: activePhase}) }
    <p>${ episode?.game?.name }</p>
  </nav>
  `;
}

function EpisodeToolbar({ episode = new Episode() } = {}) {
  const getActiveClass = (href) => {
return '/';
  }
  return `
    <nav class="toolbar color-contrast" hx-boost="true" hx-push-url="true">
      <ul class="layout-column">
        <li><a id="nav-link-home" class="${ getActiveClass('/') }" href="/">${Icon("spop")}</a></li>
        <li><a id="nav-link-gm" class="${ getActiveClass('gm') }" href="${ episode.toURL('/gm')}">${Icon("dice")}</a></li>
        <li><a id="nav-link-facilitator" class="${ getActiveClass('facilitator') }" href="${ episode.toURL('/facilitator') }">${Icon("societal")}</a></li>
        <!--li><a id="nav-link-documents" class="${ getActiveClass('documents') }" href="${ episode.toURL('/documents') }">${Icon("script")}</a></li-->
      </ul>
    </nav>
  `;
}