import express from "express";
import Episode from "#models/episode";
import Community from "#models/community";
import { broadcast } from "#routes/html/events";
import { filterUnique } from "#core/utils";

const communities = express.Router();


communities.get("/:episodeId", async (req, res) => {
  const { episodeId } = req.params;
  const { view = "list" } = req.query;

  const episode = await Episode.load(episodeId);
  res.render(`communities/${view}`, { episode })
});


communities.post("/:episodeId", async (req, res) => {
  const { episodeId } = req.params;

  const episode = await Episode.load(episodeId);
  const community = new Community(req.body);

  episode.addCommunity(community);
  episode.save();

  res.sendStatus(201);

  broadcast("societies");
});

communities.get("/:episodeId/create", async (req, res) => {
  const { episodeId } = req.params;
  const { societyId, communityId } = req.query;
  
  const episode = await Episode.load(episodeId);
  const society = episode.getSocietyById( societyId );

  res.render(`communities/create`, { episode, society, communityId });
});

////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////

communities.get("/:episodeId/:communityId/:view?", async (req, res) => {
  const { episodeId, communityId, view = "card" } = req.params;

  const episode = await Episode.load(episodeId);
  const community = episode.getCommunityById(communityId);

  res.render(`communities/${view}`, {community});
});


communities.patch("/:episodeId/:communityId", async (req, res) => {
  const { episodeId, communityId } = req.params;

  const episode = await Episode.load(episodeId);
  const community = episode.getCommunityById(communityId);

  const turn = community.society.currentTurn;
  turn.sendAmbassador( community.id, req.body.ambassadorSocietyId );

  community.update(req.body);

  episode.save();

  res.sendStatus(200);
  broadcast("societies");
});



communities.post("/:episodeId/:communityId/resources", async (req, res) => {

  const { episodeId, communityId } = req.params;
  const { resourceIds = [] } = req.body;

  const episode = await Episode.load(episodeId);
  
  //update resources
  const resources = resourceIds
    .filter(filterUnique)
    .map(episode.getResourceById);
    
  resources.forEach( resource => resource.communityId = communityId );

  episode.save();
  res.sendStatus(200);
  broadcast("resources");
});


communities.post("/:episodeId/:communityId/lose", async (req, res) => {
  const { episodeId, communityId } = req.params;
  const episode = await Episode.load(episodeId);
  const community = episode.getCommunityById(communityId);
  community.lose();
  episode.save();

  res.sendStatus(200);
  broadcast("societies");
});



communities.delete("/:episodeId/:communityId", async (req, res) => {
  const { episodeId, communityId } = req.params;

  const episode = await Episode.load(episodeId);
  episode.deleteCommunityById( communityId );
  episode.save();

  res.sendStatus(200);
  broadcast("societies");
});



export default communities;