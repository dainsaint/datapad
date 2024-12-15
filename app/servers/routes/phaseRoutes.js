import express from "express";
import Session from "../../models/session.js";
import PhaseCard from "../../components/phases/PhaseCard.js";
import PhaseTime from "../../components/phases/PhaseTime.js";

const phases = express.Router();

/*
- [ ] GET     /sessions/:session/phases/create;
- [x] GET     /sessions/:session/phases/:phase?view=card;
- [x] GET     /sessions/:session/phases/:phase?view=time;
- [ ] POST    /sessions/:session/phases/:phase;
- [x] PUT     /sessions/:session/phases/:phase;
- [ ] DELETE  /sessions/:session/phases/:phase;
- [ ] GET     /sessions/:session/phases/:phase/edit;
*/

phases.get("/sessions/:id/phases/:phase_id", (req, res, next) => {
  try {
    const { id, phase_id } = req.params;
    const { view = "card" } = req.query;

    const session = Session.load(id);
    const phase = session.getPhaseById(phase_id);

    const views = {
      card: PhaseCard,
      time: PhaseTime,
    };

    const View = views[view];

    res.send(View(phase));
  } catch (e) {
    res.status(400).send(e);
  }
});

phases.put("/sessions/:id/phases/:phase_id", (req, res, next) => {
  try {
    const { id, phase_id } = req.params;
    const { action } = req.body;

    const session = Session.load(id);
    const phase = session.getPhaseById(phase_id);

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
    session.makeActive();
    session.save();

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
