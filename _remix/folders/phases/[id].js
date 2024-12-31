import Episode from "#models/episode";
import Ledger from "#models/ledger";

export async function get (req, res) {
  const { id } = req.params;

  const episode = Ledger.getEpisodeByPhaseId(id);
  const phase = episode.getPhaseById(id);

  return { phase }
};

export async function patch(req, res) {

  try {
    const { id } = req.params;
    const { action } = req.body;

    const episode = Ledger.getEpisodeByPhaseId(id);
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
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
};