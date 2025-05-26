import express from "express";
import Episode from "#models/episode";
import Society from "#models/society";

import { broadcast } from "#routes/html/events";
import { body, matchedData } from "express-validator";
import Action from "#models/action";
import Community from "#models/community";

const societies = express.Router();

/*
- [x] GET     /episodes/:episode/societies
- [x] POST    /episodes/:episode/societies
- [x] GET     /episodes/:episode/societies/create
- [x] GET     /episodes/:episode/societies/:society
- [x] PUT     /episodes/:episode/societies/:society
- [~] DELETE  /episodes/:episode/societies/:society
*/

societies.get("/:episodeId/:view?", (req, res, next) => {
  const { episodeId, view = "list" } = req.params;
  const episode = Episode.load(episodeId);
  res.render(`societies/${view}`, { episode })
});

societies.post("/:episodeId", (req, res, next) => {
  const { episodeId } = req.params;

  const episode = Episode.load(episodeId);
  const society = new Society(req.body);
  episode.addSociety(society);
  episode.save();

  res.location(society.toURL());
  res.sendStatus(201);

  broadcast("societies");
});




////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////





societies.post("/:episodeId/:societyId/actions", (req, res, next) => {
  const { episodeId, societyId } = req.params;
  const { round } = req.body;

  const episode = Episode.load(episodeId);  
  const action = new Action({ societyId, round });
  episode.addAction(action);
  episode.save();
  
  res.location( action.toURL() )
  res.sendStatus(201);

  broadcast("actions");
});

societies.post("/:episodeId/:societyId/communities", (req, res) => {
  const { episodeId } = req.params;

  const episode = Episode.load(episodeId);
  const community = new Community(req.body);

  episode.addCommunity(community);
  episode.save();

  res.sendStatus(201);

  broadcast("societies");
});


societies.get("/:episodeId/:societyId/:view?", (req, res, next) => {
  const { episodeId, societyId, view = "panel" } = req.params;

  const episode = Episode.load(episodeId);
  const society = episode.getSocietyById(societyId);

  res.render(`societies/${view}`, { society });
});

societies.put("/:episodeId/:societyId", body("name").trim(), (req, res, next) => {
  const { episodeId, societyId } = req.params;

  const episode = Episode.load(episodeId);
  const society = episode.getSocietyById(societyId);
  const data = { ...req.body, ...matchedData(req) }

  society.update( data );
  episode.save();

  res.sendStatus(200);

  broadcast("societies");
});
    


societies.post("/:episodeId/:societyId/ambassador", (req, res) => {
  const { episodeId } = req.params;
  const { communityId, ambassadorSocietyId } = req.body;

  const episode = Episode.load(episodeId);
  const community = episode.getCommunityById(communityId);
  community.ambassadorSocietyId = ambassadorSocietyId;

  episode.save();

  res.sendStatus(200);
  broadcast("societies");
})


societies.post("/:episodeId/:societyId/emissary", (req, res) => {
  console.log("what up");
  const { episodeId, societyId } = req.params;
  const { round, emissaryCommunityId } = req.body;

  const episode = Episode.load(episodeId);
  const society = episode.getSocietyById(societyId);
  const roundData = society.getRoundData( round );
  roundData.emissaryCommunityId = emissaryCommunityId;

  episode.save();

  res.sendStatus(200);
  broadcast("societies");
})


//TODO: Determine what actual deletion logic we want, and how far it propagates
//Like, does deleting a society delete all communities it had?
// episode.removeSocietyById(societyId);

societies.delete("/:episodeId/:societyId", (req, res) => {
  const { episodeId, societyId } = req.params;

  try {
    const episode = Episode.load(episodeId);
    episode.deleteSocietyById( societyId );
    episode.save();
  
    res.sendStatus(200);
    broadcast("societies");
  } catch (e) {
    res.setHeader("HX-Trigger", "error");
    res.sendStatus(400);
  }
});




export default societies;
