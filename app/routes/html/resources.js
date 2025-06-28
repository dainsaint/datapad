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


resources.get("/:episodeId", async (req, res, next) => {
  try {
  const { episodeId } = req.params;
  const { view = "list", layout = "none" } = req.query;

  const episode = await Episode.load(episodeId);

  res.render(`resources/${view}`, { episode, layout });
} catch(err) {
  next(err);
}
});

resources.post("/:episodeId", async (req, res, next) => {
  try {
  const { episodeId } = req.params;

  const episode = await Episode.load(episodeId);
  const resource = new Resource( req.body );
  
  episode.addResource(resource);
  episode.addRecord(new Record({ type: RecordType.RESOURCE_CREATED, value: resource.name }));

  episode.save();
  
  res.location( resource.toURL() )
  res.sendStatus(201);

  broadcast("resources");
} catch(err) {
  next(err);
}
});



resources.get("/:episodeId/create", async (req, res, next) => {
  try {
  const { episodeId } = req.params;
  const { societyId, communityId } = req.query;

  const episode = await Episode.load(episodeId);
  const society = episode.getSocietyById(societyId);

  res.render(`resources/create`, { episode, society, communityId });
} catch(err) {
  next(err);
}
});



////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////




resources.get("/:episodeId/:resourceId/:view?", async (req, res, next) => {
  try {
  const { episodeId, resourceId, view = "edit" } = req.params;

  const episode = await Episode.load(episodeId);
  const resource = episode.getResourceById(resourceId);

  res.render(`resources/${view}`, { resource });
} catch(err) {
  next(err);
}
});

resources.patch("/:episodeId/:resourceId", async (req, res, next) => {
  try {
  const { episodeId, resourceId } = req.params;
  const { shouldAlterTags, exhausted } = req.body;

  const episode = await Episode.load(episodeId);
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
} catch(err) {
  next(err);
}
});


resources.post("/:episodeId/:resourceId/destroy", async (req, res, next) => {
  try {
  const { episodeId, resourceId } = req.params;
  const episode = await Episode.load(episodeId);
  const resource = episode.getResourceById(resourceId);
  resource.destroy();
  episode.save();

  res.sendStatus(200);
  broadcast("resources");
} catch(err) {
  next(err);
}
});


resources.delete("/:episodeId/:resourceId", async (req, res, next) => {
  const { episodeId, resourceId } = req.params;

  try {
    const episode = await Episode.load(episodeId);
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