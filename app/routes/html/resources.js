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


resources.get("/:episodeId", (req, res, next) => {
  const { episodeId } = req.params;
  const { view = "list", layout = "none" } = req.query;

  const episode = Episode.load(episodeId);

  res.render(`resources/${view}`, { episode, layout });
});

resources.post("/:episodeId", (req, res, next) => {
  const { episodeId } = req.params;

  const episode = Episode.load(episodeId);
  const resource = new Resource( req.body );
  
  episode.addResource(resource);
  episode.addRecord(new Record({ type: RecordType.RESOURCE_CREATED, value: resource.name }));

  episode.save();
  
  res.location( resource.toURL() )
  res.sendStatus(201);

  broadcast("resources");
});



resources.get("/:episodeId/create", (req, res, next) => {
  const { episodeId } = req.params;
  const { society, communityId } = req.query;

  const episode = Episode.load(episodeId);

  res.render(`resources/create`, { episode, society, communityId });
});



////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////




resources.get("/:episodeId/:resourceId/:view?", (req, res, next) => {
  const { episodeId, resourceId, view = "edit" } = req.params;

  const episode = Episode.load(episodeId);
  const resource = episode.getResourceById(resourceId);

  res.render(`resources/${view}`, { resource });
});

resources.patch("/:episodeId/:resourceId", (req, res, next) => {
  const { episodeId, resourceId } = req.params;
  const { shouldAlterTags, exhausted } = req.body;

  const episode = Episode.load(episodeId);
  const resource = episode.getResourceById(resourceId);

  resource.update(req.body);

  if( shouldAlterTags ) {
    if(exhausted) {
      resource.tags.add(ResourceTag.EXHAUSTED);
    } else {
      resource.tags.delete(ResourceTag.EXHAUSTED);
    }
  }

  episode.save();

  res.sendStatus(201);
  broadcast("resources");
});


resources.delete("/:episodeId/:resourceId", (req, res) => {
  const { episodeId, resourceId } = req.params;

  try {
    const episode = Episode.load(episodeId);
    episode.deleteResourceById( resourceId );
    episode.save();

    res.sendStatus(200);
    broadcast("resources");
  } catch (e) {
    res.setHeader("HX-Trigger", "error");
    res.sendStatus(400);
  }
});



export default resources;