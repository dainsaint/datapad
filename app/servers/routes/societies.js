import express from "express";
import Session from "../../models/session.js";
import Society from "../../models/society.js";

import { broadcast } from "./events.js";

const societies = express.Router();

/*
- [x] GET     /sessions/:session/societies
- [x] POST    /sessions/:session/societies
- [x] GET     /sessions/:session/societies/:society
- [x] PUT     /sessions/:session/societies/:society
- [~] DELETE  /sessions/:session/societies/:society
*/

societies.get("/sessions/:id/societies", (req, res, next) => {
  try {
    const { id } = req.params;
    const { view = "list", layout = "none" } = req.query;

    const session = Session.load(id);

    res.render(`societies/society-${view}`, { session, layout })
  } catch (e) {
    res.status(404).send(e.toString());
  }
});

societies.post("/sessions/:id/societies", (req, res, next) => {
  const { id } = req.params;

  try {
    const session = Session.load(id);
    const society = new Society(req.body);
    session.addSociety(society);
    session.save();


    // const currentUrl = req.get("hx-current-url");
    // if (currentUrl) res.setHeader("HX-Location", currentUrl);
    res.status(201)
      .location( society.toURL() )
      .setHeader("HX-Refresh", "true");

    // this should return the url of the newly created resource
    // res.s
    
    // broadcast("societies");
  } catch (e) {
    console.log(e);
    res.setHeader("HX-Trigger", "error");
    res.sendStatus(400);
  }
});


societies.get("/sessions/:id/societies/:society_id", (req, res, next) => {
  try {
    const { id, society_id } = req.params;
    const { view = "list", layout = "none" } = req.query;

    const session = Session.load(id);
    const society = session.getSocietyById(society_id);

    res.render(`societies/society-${view}`, { society, layout });
  } catch (e) {
    res.status(404).send(e.toString());
  }
});

societies.put("/sessions/:id/societies/:society_id", (req, res, next) => {
  try {
    const { id, society_id } = req.params;

    const session = Session.load(id);
    const society = session.getSocietyById(society_id);
    society.update( req.body );
    session.save();

    const currentUrl = req.get("hx-current-url");
    if (currentUrl) res.setHeader("HX-Location", currentUrl);
    res.sendStatus(200);

    broadcast("societies");
  } catch (e) {
    res.status(404).send(e.toString());
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

    // society.communities.forEach( community => {
    //   community.resources.forEach( resource => 
    //     session.removeResource(resource)
    //   );

    //   session.removeCommunity(community);
    // })

    // session.removeSociety(society);

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
