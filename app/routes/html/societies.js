import express from "express";
import Episode from "../../models/episode.js";
import Society from "../../models/society.js";

import { broadcast } from "./events.js";

const societies = express.Router();

/*
- [x] GET     /episodes/:episode/societies
- [x] POST    /episodes/:episode/societies
- [x] GET     /episodes/:episode/societies/:society
- [x] PUT     /episodes/:episode/societies/:society
- [~] DELETE  /episodes/:episode/societies/:society
*/

societies.get("/episodes/:id/societies", (req, res, next) => {
  try {
    const { id } = req.params;
    const { view = "list", layout = "none" } = req.query;

    const episode = Episode.load(id);

    res.render(`societies/${view}`, { episode, layout })
  } catch (e) {
    res.status(404).send(e.toString());
  }
});

societies.post("/episodes/:id/societies", (req, res, next) => {
  const { id } = req.params;

  try {
    const episode = Episode.load(id);
    const society = new Society(req.body);
    episode.addSociety(society);
    episode.save();

    const currentUrl = req.get("hx-current-url");
    if (currentUrl) res.setHeader("HX-Location", currentUrl);
    res.status(201)
      .location( society.toURL() )

    // TODO: this should really return the url of the newly created resource...
    
    broadcast("societies");
  } catch (e) {
    console.log(e);
    res.setHeader("HX-Trigger", "error");
    res.sendStatus(400);
  }
});


societies.get("/episodes/:id/societies/:society_id", (req, res, next) => {
  try {
    const { id, society_id } = req.params;
    const { view = "list", layout = "none" } = req.query;

    const episode = Episode.load(id);
    const society = episode.getSocietyById(society_id);

    res.render(`societies/${view}`, { society, layout });
  } catch (e) {
    res.status(404).send(e.toString());
  }
});

societies.put("/episodes/:id/societies/:society_id", (req, res, next) => {
  try {
    const { id, society_id } = req.params;

    const episode = Episode.load(id);
    const society = episode.getSocietyById(society_id);
    society.update( req.body );
    episode.save();

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
// episode.removeSocietyById(society_id);

societies.delete("/episodes/:id/societies/:society_id", (req, res) => {
  const { id, society_id } = req.params;

  try {
    const episode = Episode.load(id);
    const society = episode.getSocietyById(society_id);

    // society.communities.forEach( community => {
    //   community.resources.forEach( resource => 
    //     episode.removeResource(resource)
    //   );

    //   episode.removeCommunity(community);
    // })

    // episode.removeSociety(society);

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
