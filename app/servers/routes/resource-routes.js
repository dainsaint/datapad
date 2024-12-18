import express from "express";
import Session from "../../models/session.js";
import Resource from "../../models/resource.js";
import { broadcast } from "./event-routes.js";

const resources = express.Router();

/*
- [X] GET     /sessions/:session/resources;
- [X] POST    /sessions/:session/resources;
- [x] GET     /sessions/:session/resources/:resource;
- [ ] PATCH   /sessions/:session/resources/:resource;
*/


resources.get("/sessions/:id/resources", (req, res, next) => {
  try {
    const { id } = req.params;
    const { view = "list", layout = "none" } = req.query;

    const session = Session.load(id);

    res.render(`resources/resource-${view}`, { session, layout });
  } catch (e) {
    res.status(400).send(e);
  }
});

resources.post("/sessions/:id/resources", (req, res, next) => {
  try {
    const { id } = req.params;
    const { community_id } = req.body;

    const session = Session.load(id);
    const community = session.getCommunityById( community_id );
    const resource = new Resource( req.body );
    
    community.addResource(resource);
    session.addResource(resource);
    session.save();
    
    const currentUrl = req.get("hx-current-url");
    if (currentUrl) res.setHeader("HX-Location", currentUrl);
    res.sendStatus(201);

    broadcast("resources");
  } catch (e) {
    res.status(400).send(e);
  }
});


resources.get("/sessions/:id/resources/:resource_id", (req, res, next) => {
  try {
    const { id, resource_id } = req.params;
    const { view = "card", layout = "none" } = req.query;  

    const session = Session.load(id);
    const resource = session.getResourceById(resource_id);

    res.render(`resources/resource-${view}`, { resource, layout });
  } catch (e) {
    res.status(400).send(e);
  }
});

resources.patch("/sessions/:id/resources/:resource_id", (req, res, next) => {
  try {
    const { id, resource_id } = req.params;
    const { community_id } = req.body;

    const session = Session.load(id);
    const resource = session.getResourceById(resource_id);

    const prevCommunity = session.communities.find(community => community.getResourceById(resource_id));
    const nextCommunity = session.getCommunityById(community_id);

    if( prevCommunity != nextCommunity ) {
      prevCommunity.removeResource( resource );
      nextCommunity.addResource( resource );
    }

    resource.update(req.body);
    session.save();

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