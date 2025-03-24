import express from "express";
import Episode from "#models/episode";
import Resource, { ResourceTag } from "#models/resource";
import { broadcast } from "#routes/html/events";


const resources = express.Router();

/*
- [X] GET     /episodes/:episode/resources;
- [X] POST    /episodes/:episode/resources;
- [x] GET     /episodes/:episode/resources/:resource;
- [x] PATCH   /episodes/:episode/resources/:resource;
*/


resources.get("/episodes/:episodeId/resources", (req, res, next) => {
  const { episodeId } = req.params;
  const { view = "list", layout = "none" } = req.query;

  const episode = Episode.load(episodeId);

  res.render(`resources/${view}`, { episode, layout });
});

resources.post("/episodes/:episodeId/resources", (req, res, next) => {
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
});



resources.get("/episodes/:episodeId/resources/create", (req, res, next) => {
  const { episodeId } = req.params;
  const { society, communityId } = req.query;

  const episode = Episode.load(episodeId);

  res.render(`resources/create`, { episode, society, communityId, layout: "none" });
});



////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////




resources.get("/episodes/:episodeId/resources/:resourceId/:view?", (req, res, next) => {
  const { episodeId, resourceId, view = "edit" } = req.params;

  const episode = Episode.load(episodeId);
  const resource = episode.getResourceById(resourceId);

  res.render(`resources/${view}`, { resource, layout: "none" });
});

resources.patch("/episodes/:episodeId/resources/:resourceId", (req, res, next) => {
  const { episodeId, resourceId } = req.params;
  const { communityId, shouldAlterTags, vital, exhausted } = req.body;

  const episode = Episode.load(episodeId);
  const resource = episode.getResourceById(resourceId);

  const prevCommunity = episode.communities.find(community => community.getResourceById(resourceId));
  const nextCommunity = episode.getCommunityById(communityId);

  if( prevCommunity != nextCommunity ) {
    prevCommunity.removeResource( resource );
    nextCommunity.addResource( resource );
  }

  console.log( req.body );
  delete req.body.shouldAlterTags;
  delete req.body.exhausted;
  delete req.body.vital;


  resource.update(req.body);
console.log( resource );
  if( shouldAlterTags ) {
    if(vital) {
      resource.tags.add(ResourceTag.VITAL);
    } else {
      resource.tags.delete(ResourceTag.VITAL);
    }

    if(exhausted) {
      resource.tags.add(ResourceTag.EXHAUSTED);
    } else {
      resource.tags.delete(ResourceTag.EXHAUSTED);
    }
  }



  episode.save();

  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);
  res.sendStatus(201);

  broadcast("resources");
});

export default resources;