import express from "express";
import Episode from "#models/episode";
import Resource, { ResourceTag } from "#models/resource";
import { broadcast } from "#routes/html/events";
import Record, { RecordType } from "#models/record";


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

  const episode = Episode.load(episodeId);
  const resource = new Resource( req.body );
  
  episode.addResource(resource);
  episode.addRecord(new Record({ type: RecordType.RESOURCE_CREATED, value: resource.name }));

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
  const { shouldAlterTags, vital, exhausted } = req.body;

  const episode = Episode.load(episodeId);
  const resource = episode.getResourceById(resourceId);

  resource.update(req.body);

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