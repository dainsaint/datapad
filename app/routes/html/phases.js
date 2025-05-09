import Episode from "#models/episode";
import Phase, { PhaseStatus, PhaseType } from "#models/phase";
import Record, { RecordType } from "#models/record";
import express from "express";
import { broadcast } from "#routes/html/events";


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
  const prevPhase = episode.phases.at( episode.phases.indexOf(phase) - 1);
  const nextPhase = episode.phases.at( episode.phases.indexOf(phase) + 1);

  switch (action) {
    case "prev":
      prevPhase.status = PhaseStatus.IDLE;
      break;
    case "start":
      phase.startPhase();
      if( phase.type == PhaseType.UNIVERSAL ) {
        console.log("BLKABFA");
        episode.startRound( phase.round );
      }
      break;
    case "pause":
      phase.pausePhase();
      break;
    case "next":
      phase.completePhase();
      
      if( nextPhase && nextPhase.round > phase.round ) {
        episode.completeRound( phase.round );
      }
      
      break;
  }
  //TODO: remove active doofer
  episode.makeActive();
  episode.save();

  //this is the way to "refresh" whatever page
  //this was called from using ajax
  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);

  broadcast("phases");
  broadcast("societies");
  
  res.sendStatus(200);

});

phases.post("/episodes/:episodeId/phases/:phaseId", (req, res, next) => {
  const { episodeId, phaseId } = req.params;
  const { type, round, duration: { minutes, seconds }} = req.body;

  const episode = Episode.load(episodeId);
  const phase = episode.getPhaseById(phaseId);
  
  const update = {
    type,
    round: parseInt(round),
    duration: parseInt(minutes) * 60 + parseInt(seconds)
  };

  phase.update( update );
  episode.save();

  //this is the way to "refresh" whatever page
  //this was called from using ajax
  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);
  
  res.sendStatus(200);
})


phases.delete("/episodes/:episodeId/phases/:phaseId", (req, res) => {
  const { episodeId, phaseId } = req.params;

  try {
    const episode = Episode.load(episodeId);
    episode.deletePhaseById( phaseId );
    episode.save();
  
    const currentUrl = req.get("hx-current-url");
    if (currentUrl) res.setHeader("HX-Location", currentUrl);
    res.sendStatus(200);
    broadcast("phases");
  } catch (e) {
    res.setHeader("HX-Trigger", "error");
    res.sendStatus(400);
  }
});

export default phases;