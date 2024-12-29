import { secondsToTime } from "#core/utils"
import Episode from "#models/episode";
import Phase from "#models/phase"

export const route = "/episodes/:eid/phases/:id/:view?";

export async function get(req) {
  const { eid, id, view = "card" } = req.params;

  const episode = Episode.load(eid);
  const phase = episode.getPhaseById(id);

  return { phase, view }
};


export default function PhaseView({ phase = new Phase(), view = "card" } = {}) {
  //switch based on view, somehow
  const Views = {
    card: PhaseCard,
    time: PhaseTime
  }

  return Views[view]({ phase });
}

export function PhaseCard({ phase = new Phase() }, i ) { 
  const headings = ["Now", "Next", "Then"];
  return `
    <div class="card ${i == 0 ? 'card-fancy color-contrast' : 'card-transparent'} stack">
      <p class="annotation">${headings[i]}</p>
      ${ PhaseTime({ phase }) }
    </div>
  `;
}

export function PhaseTime({ phase = new Phase() } = {}) {
  return `
    <div class="phase-time" hx-get="${ phase.toURL('/time') }" hx-trigger="sse:phases">
      <header>
        <h2>${phase.name}</h2>
        <p class="subtitle">Round ${phase.round + 1}</p>
      </header>
      <time datetime="${phase.timeRemaining}s">${secondsToTime(phase.timeRemaining)}</time>    
    </div>
  `
}



export async function put(req, res) {
  const { eid, id } = req.params;
  const { action } = req.body;

  const episode = Episode.load(eid);
  const phase = episode.getPhaseById(id);

  //TODO: handle this logic better, with the mutability problem
  switch (action) {
    case "start":
      phase.startPhase();
      break;
    case "pause":
      phase.pausePhase();
      break;
    case "stop":
      phase.completePhase();
      break;
  }
  //TODO: remove active doofer
  episode.makeActive();
  episode.save();

  //this is the way to "refresh" whatever page
  //this was called from using ajax
  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);

  res.sendStatus(200);
}
