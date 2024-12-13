import express from "express";
import Session from "../../models/session.js";
import Society from "../../models/society.js";
import DialogCreateSociety from "../../components/DialogCreateSociety.js";
import { SocietyCardList } from "../../components/GameMaster.js";
import { broadcast } from "./events.js";

const societies = express.Router();

/*
- [x] GET     /sessions/:session/societies
- [x] POST    /sessions/:session/societies
- [ ] GET     /sessions/:session/societies/:society
- [ ] PUT     /sessions/:session/societies/:society
- [~] DELETE  /sessions/:session/societies/:society
- [ ] GET     /sessions/:session/societies/:society/edit
*/

societies.get("/sessions/:id/societies", (req, res, next) => {
  try {
    const { id } = req.params;
    const { view = "list" } = req.query;

    const session = Session.load(id);

    const views = {
      create: DialogCreateSociety,
      list: SocietyCardList,
    };

    const View = views[view];

    res.send(View(session));
  } catch (e) {
    res.status(404).send(e.toString());
  }
});


societies.post("/sessions/:id/societies", (req, res, next) => {
  const { id } = req.params;

  try {
    const session = Session.load(id);
    const society = Society(req.body);
    session.addSociety(society);
    session.save();

    console.log( session.societies );

    const currentUrl = req.get("hx-current-url");
    if (currentUrl) res.setHeader("HX-Location", currentUrl);
    res.sendStatus(201);
    broadcast("societies");
  } catch (e) {
    console.log(e);
    res.setHeader("HX-Trigger", "error");
    res.sendStatus(400);
  }
});

    
//TODO: Determine what actual deletion logic we want, and how far it propagates
//Like, does deleting a society delete all communities it had?
// session.removeSocietyById(society_id);

societies.delete("/sessions/:id/societies/:society_id", (req, res) => {
  const { id, society_id } = req.params;

  try {
    const session = Session.load(id);
    const society = session.getSocietyById(society_id);

    const currentUrl = req.get("hx-current-url");
    if (currentUrl) res.setHeader("HX-Location", currentUrl);
    res.sendStatus(200);
    broadcast("societies");
  } catch (e) {
    res.setHeader("HX-Trigger", "error");
    res.sendStatus(400);
  }
});

export default societies;
