import Episode from "#models/episode";
import Phase, { PhaseStatus } from "#models/phase";
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

  res.render(`phases/${view}`, { phase, layout: "none" });
});

phases.put("/episodes/:episodeId/phases/:phaseId", (req, res, next) => {
  const { episodeId, phaseId } = req.params;
  const { action } = req.body;
  
  const episode = Episode.load(episodeId);
  const phase = episode.getPhaseById(phaseId);

  //TODO: handle this logic better, with the mutability problem
  switch (action) {
    case "prev":
      const prevPhase = episode.phases.at( episode.phases.indexOf(phase) - 1);
      prevPhase.status = PhaseStatus.IDLE;
      break;
    case "start":
      phase.startPhase();
      break;
    case "pause":
      phase.pausePhase();
      break;
    case "next":
      phase.completePhase();
      break;
    case "split":
      const newGalacticPhase = new Phase({
        name: "Galactic Phase",
        round: phase.round,
        duration: 180
      })
      episode.splitPhase(phase, newGalacticPhase);
      // console.log( Phase.splitPhase(phase) );
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

});

export default phases;