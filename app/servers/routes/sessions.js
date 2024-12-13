import express from "express";
import Session from "../../models/session.js";
import GameMaster from "../../components/GameMaster.js";
import Facilitator from "../../components/Facilitator.js";
import Script from "../../components/Script.js";
import App from "../../components/App.js";
import { broadcast } from "./events.js";

const sessions = express.Router();

/*
- [ ] GET     /sessions/create;
- [ ] GET     /sessions/:session/gm;
- [ ] GET     /sessions/:session/facilitator;
- [ ] GET     /sessions/:session/script;
*/


sessions.get("/sessions/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { view = "gm" } = req.query;

    const views = {
      gm: GameMaster,
      facilitator: Facilitator,
      script: Script,
    };

    const session = Session.load(id);
    const View = views[view];

    res.send(App(View(session)));
  } catch (e) {
    res.status(404).send(e.toString());
  }
});

export default sessions;