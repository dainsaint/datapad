import express from "express";
import Episode from "#models/episode";
import Community from "#models/community";
import { broadcast } from "#routes/html/events";
import { filterUnique } from "#core/utils";

const communities = express.Router();


communities.get("/:episodeId", (req, res) => {
  const { episodeId } = req.params;
  const { view = "list" } = req.query;

  const episode = Episode.load(episodeId);
  res.render(`communities/${view}`, { episode })
});


communities.post("/:episodeId", (req, res) => {
  const { episodeId } = req.params;

  const episode = Episode.load(episodeId);
  const community = new Community(req.body);

  episode.addCommunity(community);
  episode.save();

  res.sendStatus(201);

  broadcast("societies");
});

communities.get("/:episodeId/create", (req, res) => {
  const { episodeId } = req.params;
  const { societyId } = req.query;
  
  const episode = Episode.load(episodeId);
  const society = episode.getSocietyById( societyId );

  res.render(`communities/create`, { episode, society });
});

////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////

communities.get("/:episodeId/:communityId/:view?", (req, res) => {
  const { episodeId, communityId, view = "card" } = req.params;

  const episode = Episode.load(episodeId);
  const community = episode.getCommunityById(communityId);

  res.render(`communities/${view}`, {community});
});


communities.patch("/:episodeId/:communityId", (req, res) => {
  const { episodeId, communityId } = req.params;

  const episode = Episode.load(episodeId);
  const community = episode.getCommunityById(communityId);
  community.update(req.body);

  episode.save();

  res.sendStatus(200);
  broadcast("societies");
});



communities.post("/:episodeId/:communityId/resources", (req, res) => {

  const { episodeId, communityId } = req.params;
  const { resourceIds = [] } = req.body;

  const episode = Episode.load(episodeId);
  
  //update resources
  const resources = resourceIds
    .filter(filterUnique)
    .map(episode.getResourceById);
    
  resources.forEach( resource => resource.communityId = communityId );

  episode.save();
  res.sendStatus(200);
  broadcast("resources");
});



communities.delete("/:episodeId/:communityId", (req, res) => {
  const { episodeId, communityId } = req.params;

  const episode = Episode.load(episodeId);
  episode.deleteCommunityById( communityId );
  episode.save();

  res.sendStatus(200);
  broadcast("societies");
});



export default communities;