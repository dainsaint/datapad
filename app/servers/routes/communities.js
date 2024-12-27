import express from "express";
import Session from "../../models/session.js";
import Community from "../../models/community.js";
import { broadcast } from "./events.js";

const communities = express.Router();

/*
- [x] GET     /sessions/:session/communities;
- [X] POST    /sessions/:session/communities;
- [X] GET     /sessions/:session/communities/:community?view=card;
- [X] PATCH   /sessions/:session/communities/:community;
- [ ] DELETE  /sessions/:session/communities/:community;
*/

communities.get("/sessions/:id/communities", (req, res) => {
  const { id } = req.params;
  const { view = "list", layout = "none" } = req.query;

  try {
    const session = Session.load(id);

    res.render(`communities/community-${view}`, { session, layout })
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});


communities.post("/sessions/:id/communities", (req, res) => {
  try {
    const { id } = req.params;
    const { society_id } = req.body;

    const session = Session.load(id);
    const society = session.getSocietyById(society_id);
    const community = new Community(req.body);

    society.addCommunity(community);
    session.addCommunity(community);
    session.save();
    
    const currentUrl = req.get("hx-current-url");
    if (currentUrl) res.setHeader("HX-Location", currentUrl);
    res.sendStatus(201);

    broadcast("resources");
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

communities.get("/sessions/:id/communities/:community_id", (req, res) => {
  try {
    const { community_id, id } = req.params;
    const { view = "card", layout = "none" } = req.query;

    const session = Session.load(id);
    const community = session.getCommunityById(community_id);

    res.render(`communities/community-${view}`, {community, layout});
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

communities.patch("/sessions/:id/communities/:community_id", (req, res) => {
  try {
    const { community_id, id } = req.params;
    const { society_id, resource_ids = [] } = req.body;

    const session = Session.load(id);
    const community = session.getCommunityById(community_id);
    
    //update resources
    const resources = resource_ids.map(session.getResourceById);
    community.resources = resources;

    //update societies (encapsulate!)
    const prevSociety = session.societies.find(society => society.getCommunityById(community_id));
    const nextSociety = session.getSocietyById(society_id);

    if( prevSociety && nextSociety && prevSociety != nextSociety ) {
      prevSociety.removeCommunity(community);
      nextSociety.addCommunity(community);
    }

    session.save();

    const currentUrl = req.get("hx-current-url");
    if (currentUrl) res.setHeader("HX-Location", currentUrl);
    res.sendStatus(200);
    broadcast("resources");
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

export default communities;