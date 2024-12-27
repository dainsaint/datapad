import express from "express";
import Session from "../../models/session.js";

const sessions = express.Router();

/*
- [ ] GET     /sessions/create;
- [ ] GET     /sessions/:session/gm;
- [ ] GET     /sessions/:session/facilitator;
- [ ] GET     /sessions/:session/showrunner;
- [ ] GET     /sessions/:session/script;
*/

sessions.get("/sessions", (req, res) => {
  try {
    const { view = "create" } = req.query;

    res.render(`sessions/${view}`, { layout: "none" });
  } catch (e) {
    res.status(404).send(e.toString());
  }
});

sessions.post("/sessions", (req, res) => {
  try {
    const session = new Session(req.body);
    //todo: validation
    session.save();

    res.redirect( session.toURL() );
  } catch (e) {
    res.status(404).send(e.toString());
  }
})


sessions.get("/sessions/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { view = "gm" } = req.query;
    const session = Session.load(id);

    res.render(`sessions/${view}`, { session, layout: "app" });
  } catch (e) {
    res.status(404).send(e.toString());
  }
});

export default sessions;