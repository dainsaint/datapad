import express from "express";
import Session from "../../models/session.js";

import App from "../../components/layouts/App.js";
import SessionGameMaster from "../../components/sessions/SessionGameMaster.js";
import SessionFacilitator from "../../components/sessions/SessionFacilitator.js";
import SessionDocuments from "../../components/sessions/SessionDocuments.js";


const sessions = express.Router();

/*
- [ ] GET     /sessions/create;
- [ ] POST    /sessions;
- [ ] PATCH   /sessions/:session;
- [x] GET     /sessions/:session/game-master;
- [x] GET     /sessions/:session/facilitator;
- [ ] GET     /sessions/:session/showrunner;
- [ ] GET     /sessions/:session/prep;
- [x] GET     /sessions/:session/documents;
*/


sessions.get("/sessions/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { view = "gm" } = req.query;

    const views = {
      gm: SessionGameMaster,
      facilitator: SessionFacilitator,
      documents: SessionDocuments,
    };

    const session = Session.load(id);
    const View = views[view];

    res.send(App(View(session)));
  } catch (e) {
    res.status(404).send(e.toString());
  }
});

export default sessions;