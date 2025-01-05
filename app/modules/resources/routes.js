import express from "express";
import Episode from "#modules/episodes/model";
import Resource from "#modules/resources/model";
import { broadcast } from "#modules/events/routes";


const resources = express.Router();

/*
- [X] GET     /episodes/:episode/resources;
- [X] POST    /episodes/:episode/resources;
- [x] GET     /episodes/:episode/resources/:resource;
- [x] PATCH   /episodes/:episode/resources/:resource;
*/


resources.get("/episodes/:episodeId/resources", (req, res, next) => {
  try {
    const { episodeId } = req.params;
    const { view = "list", layout = "none" } = req.query;

    const episode = Episode.load(episodeId);

    res.render(`resources/views/${view}`, { episode, layout });
  } catch (e) {
    res.status(400).send(e);
  }
});

resources.post("/episodes/:episodeId/resources", (req, res, next) => {
  try {
    const { episodeId } = req.params;
    const { communityId } = req.body;

    const episode = Episode.load(episodeId);
    const community = episode.getCommunityById( communityId );
    const resource = new Resource( req.body );
    
    community.addResource(resource);
    episode.addResource(resource);
    episode.save();
    
    const currentUrl = req.get("hx-current-url");
    if (currentUrl) res.setHeader("HX-Location", currentUrl);
    
    res.location( resource.toURL() )
    res.sendStatus(201);

    broadcast("resources");
  } catch (e) {
    res.status(400).send(e);
  }
});



resources.get("/episodes/:episodeId/resources/create", (req, res, next) => {
  const { episodeId } = req.params;
  const { society } = req.query;

  const episode = Episode.load(episodeId);

  res.render(`resources/views/create`, { episode, society, layout: "none" });
});



////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////




resources.get("/episodes/:episodeId/resources/:resourceId/:view?", (req, res, next) => {
  try {
    const { episodeId, resourceId, view = "edit" } = req.params;

    const episode = Episode.load(episodeId);
    const resource = episode.getResourceById(resourceId);

    res.render(`resources/views/${view}`, { resource, layout: "none" });
  } catch (e) {
    res.status(400).send(e);
  }
});

resources.patch("/episodes/:episodeId/resources/:resourceId", (req, res, next) => {
  try {
    const { episodeId, resourceId } = req.params;
    const { communityId } = req.body;

    const episode = Episode.load(episodeId);
    const resource = episode.getResourceById(resourceId);

    const prevCommunity = episode.communities.find(community => community.getResourceById(resourceId));
    const nextCommunity = episode.getCommunityById(communityId);

    if( prevCommunity != nextCommunity ) {
      prevCommunity.removeResource( resource );
      nextCommunity.addResource( resource );
    }

    resource.update(req.body);
    episode.save();

    const currentUrl = req.get("hx-current-url");
    if (currentUrl) res.setHeader("HX-Location", currentUrl);
    res.sendStatus(201);

    broadcast("resources");
  } catch (e) {
    console.log( e );
    res.status(400).send(e);
  }
});

export default resources;