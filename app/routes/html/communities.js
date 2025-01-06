import express from "express";
import Episode from "../../models/episode.js";
import Community from "../../models/community.js";
import { broadcast } from "#routes/html/events";

const communities = express.Router();

/*
- [x] GET     /episodes/:episode/communities;
- [X] POST    /episodes/:episode/communities;
- [X] GET     /episodes/:episode/communities/:community/:view?
- [X] PATCH   /episodes/:episode/communities/:community;
- [ ] DELETE  /episodes/:episode/communities/:community;
*/

communities.get("/episodes/:episodeId/communities", (req, res) => {
  const { episodeId } = req.params;
  const { view = "list" } = req.query;

  const episode = Episode.load(episodeId);
  res.render(`communities/views/${view}`, { episode })
});


communities.post("/episodes/:episodeId/communities", (req, res) => {
  const { episodeId } = req.params;
  const { societyId } = req.body;

  const episode = Episode.load(episodeId);
  const society = episode.getSocietyById(societyId);
  const community = new Community(req.body);

  society.addCommunity(community);
  episode.addCommunity(community);
  episode.save();
  
  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);
  res.sendStatus(201);

  broadcast("resources");
});

communities.get("/episodes/:episodeId/communities/create", (req, res) => {
  const { episodeId } = req.params;
  const { society } = req.query;
  const episode = Episode.load(episodeId);
  res.render(`communities/views/create`, { episode, society, layout: "none" });
});

////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////

communities.get("/episodes/:episodeId/communities/:communityId/:view?", (req, res) => {
  const { episodeId, communityId, view = "card" } = req.params;

  const episode = Episode.load(episodeId);
  const community = episode.getCommunityById(communityId);

  res.render(`communities/views/${view}`, {community, layout: "none"});
});

communities.patch("/episodes/:episodeId/communities/:communityId", (req, res) => {
  const { episodeId, communityId } = req.params;
  const { societyId, resourceIds = [] } = req.body;

  const episode = Episode.load(episodeId);
  const community = episode.getCommunityById(communityId);
  
  //update resources
  const resources = resourceIds.map(episode.getResourceById);
  community.resources = resources;

  //update societies (encapsulate!)
  const prevSociety = episode.societies.find(society => society.getCommunityById(communityId));
  const nextSociety = episode.getSocietyById(societyId);

  if( prevSociety && nextSociety && prevSociety != nextSociety ) {
    prevSociety.removeCommunity(community);
    nextSociety.addCommunity(community);
  }

  episode.save();

  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);
  res.sendStatus(200);
  broadcast("resources");
});

export default communities;