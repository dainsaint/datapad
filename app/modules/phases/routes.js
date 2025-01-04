import Episode from "#modules/episodes/model";
import express from "express";


const phases = express.Router();

/*
- [ ] GET     /episodes/:episode/phases;
- [ ] POST    /episodes/:episode/phases;
- [x] GET     /episodes/:episode/phases/:phase;
- [x] PUT     /episodes/:episode/phases/:phase;
- [ ] DELETE  /episodes/:episode/phases/:phase;
*/

phases.get("/episodes/:episodeId/phases/:phaseId/:view?", (req, res, next) => {
  const { episodeId, phaseId, view = "card" } = req.params;

  const episode = Episode.load(episodeId);
  const phase = episode.getPhaseById(phaseId);

  res.render(`phases/views/${view}`, { phase, layout: "none" });
});

phases.put("/episodes/:episodeId/phases/:phaseId", (req, res, next) => {
  try {
    const { episodeId, phaseId } = req.params;
    const { action } = req.body;

    const episode = Episode.load(episodeId);
    const phase = episode.getPhaseById(phaseId);

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
});

export default phases;