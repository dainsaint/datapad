import express from "express";
import Episode from "#models/episode";
import Society from "#models/society";

import { broadcast } from "#routes/html/events";
import { body, matchedData } from "express-validator";

const societies = express.Router();

/*
- [x] GET     /episodes/:episode/societies
- [x] POST    /episodes/:episode/societies
- [x] GET     /episodes/:episode/societies/create
- [x] GET     /episodes/:episode/societies/:society
- [x] PUT     /episodes/:episode/societies/:society
- [~] DELETE  /episodes/:episode/societies/:society
*/

societies.get("/episodes/:episodeId/societies/:view?", (req, res, next) => {
  const { episodeId, view = "list" } = req.params;
  const episode = Episode.load(episodeId);
  res.render(`societies/${view}`, { episode, layout: "none" })
});

societies.post("/episodes/:episodeId/societies", (req, res, next) => {
  const { episodeId } = req.params;

  const episode = Episode.load(episodeId);
  const society = new Society(req.body);
  episode.addSociety(society);
  episode.save();

  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);

  res.location(society.toURL());
  res.sendStatus(201);
  // TODO: this should really return the url of the newly created resource...
  
  broadcast("societies");
});


societies.get("/episodes/:episodeId/societies/create", (req, res, next) => {
  const { episodeId } = req.params;
  const episode = Episode.load(episodeId);
  res.render(`societies/create`, { episode, layout: "none" });
});


////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////

societies.get("/episodes/:episodeId/societies/:societyId/:view?", (req, res, next) => {
  const { episodeId, societyId, view = "panel" } = req.params;

  const episode = Episode.load(episodeId);
  const society = episode.getSocietyById(societyId);

  res.render(`societies/${view}`, { society, layout: "none" });
});

societies.put("/episodes/:episodeId/societies/:societyId", body("name").trim(), (req, res, next) => {
  const { episodeId, societyId } = req.params;

  const episode = Episode.load(episodeId);
  const society = episode.getSocietyById(societyId);
  const data = { ...req.body, ...matchedData(req) }

  society.update( data );
  episode.save();

  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);
  res.sendStatus(200);

  broadcast("societies");
});
    
//TODO: Determine what actual deletion logic we want, and how far it propagates
//Like, does deleting a society delete all communities it had?
// episode.removeSocietyById(societyId);

societies.delete("/episodes/:episodeId/societies/:societyId", (req, res) => {
  const { episodeId, societyId } = req.params;

  try {
    const episode = Episode.load(episodeId);
    episode.deleteSocietyById( societyId );
    episode.save();
  
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
