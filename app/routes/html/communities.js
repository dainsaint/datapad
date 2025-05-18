import express from "express";
import Episode from "#models/episode";
import Community from "#models/community";
import { broadcast } from "#routes/html/events";
import { filterUnique } from "#core/utils";

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
  res.render(`communities/${view}`, { episode })
});


communities.post("/episodes/:episodeId/communities", (req, res) => {
  const { episodeId } = req.params;

  const episode = Episode.load(episodeId);
  const community = new Community(req.body);

  episode.addCommunity(community);
  episode.save();

  res.sendStatus(201);

  broadcast("societies");
});

communities.get("/episodes/:episodeId/communities/create", (req, res) => {
  const { episodeId } = req.params;
  const { society } = req.query;
  const episode = Episode.load(episodeId);
  res.render(`communities/create`, { episode, society, layout: "none" });
});

////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////

communities.get("/episodes/:episodeId/communities/:communityId/:view?", (req, res) => {
  const { episodeId, communityId, view = "card" } = req.params;

  const episode = Episode.load(episodeId);
  const community = episode.getCommunityById(communityId);

  res.render(`communities/${view}`, {community, layout: "none"});
});


communities.patch("/episodes/:episodeId/communities/:communityId", (req, res) => {
  const { episodeId, communityId } = req.params;

  const episode = Episode.load(episodeId);
  const community = episode.getCommunityById(communityId);
  community.update(req.body);

  episode.save();

  res.sendStatus(200);
  broadcast("societies");
});



communities.post("/episodes/:episodeId/communities/:communityId/resources", (req, res) => {

  const { episodeId, communityId } = req.params;
  const { resourceIds = [] } = req.body;

  const episode = Episode.load(episodeId);
  
  //update resources
  const resources = resourceIds
    .filter(filterUnique)
    .map(episode.getResourceById);
    
  resources.forEach( resource => resource.communityId = communityId );

  episode.save();

  res.redirect(`/episodes/${episodeId}/communities/${communityId}/card`);
  
  broadcast("resources");
});



communities.delete("/episodes/:episodeId/communities/:communityId", (req, res) => {
  const { episodeId, communityId } = req.params;

  const episode = Episode.load(episodeId);
  episode.deleteCommunityById( communityId );
  episode.save();

  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);
  res.sendStatus(200);
  broadcast("societies");
});



export default communities;