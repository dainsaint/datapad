import express from "express";
import Episode from "../../models/episode.js";
import Resource from "../../models/resource.js";
import { broadcast } from "./events.js";

const resources = express.Router();

/*
- [X] GET     /episodes/:episode/resources;
- [X] POST    /episodes/:episode/resources;
- [x] GET     /episodes/:episode/resources/:resource;
- [x] PATCH   /episodes/:episode/resources/:resource;
*/


resources.get("/episodes/:id/resources", (req, res, next) => {
  try {
    const { id } = req.params;
    const { view = "list", layout = "none" } = req.query;

    const episode = Episode.load(id);

    res.render(`resources/${view}`, { episode, layout });
  } catch (e) {
    res.status(400).send(e);
  }
});

resources.post("/episodes/:id/resources", (req, res, next) => {
  try {
    const { id } = req.params;
    const { community_id } = req.body;

    const episode = Episode.load(id);
    const community = episode.getCommunityById( community_id );
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



resources.get("/episodes/:id/resources/create", (req, res, next) => {
  const { id } = req.params;
  const { society } = req.query;

  const episode = Episode.load(id);

  res.render(`resources/create`, { episode, society, layout: "none" });
});



////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////




resources.get("/episodes/:id/resources/:resource_id/:view?", (req, res, next) => {
  try {
    const { id, resource_id, view = "card" } = req.params;

    const episode = Episode.load(id);
    const resource = episode.getResourceById(resource_id);

    res.render(`resources/${view}`, { resource, layout: "none" });
  } catch (e) {
    res.status(400).send(e);
  }
});

resources.patch("/episodes/:id/resources/:resource_id", (req, res, next) => {
  try {
    const { id, resource_id } = req.params;
    const { community_id } = req.body;

    const episode = Episode.load(id);
    const resource = episode.getResourceById(resource_id);

    const prevCommunity = episode.communities.find(community => community.getResourceById(resource_id));
    const nextCommunity = episode.getCommunityById(community_id);

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