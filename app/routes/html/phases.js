import express from "express";
import Episode from "../../models/episode.js";

const phases = express.Router();

/*
- [ ] GET     /episodes/:episode/phases;
- [ ] POST    /episodes/:episode/phases;
- [x] GET     /episodes/:episode/phases/:phase;
- [x] PUT     /episodes/:episode/phases/:phase;
- [ ] DELETE  /episodes/:episode/phases/:phase;
*/

phases.get("/episodes/:id/phases/:phase_id", (req, res, next) => {
  try {
    const { id, phase_id } = req.params;
    const { view = "card", layout = "none" } = req.query;  

    const episode = Episode.load(id);
    const phase = episode.getPhaseById(phase_id);

    res.render(`phases/${view}`, { phase, layout });
  } catch (e) {
    res.status(400).send(e);
  }
});

phases.put("/episodes/:id/phases/:phase_id", (req, res, next) => {
  try {
    const { id, phase_id } = req.params;
    const { action } = req.body;

    const episode = Episode.load(id);
    const phase = episode.getPhaseById(phase_id);

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