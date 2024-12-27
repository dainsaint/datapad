import express from "express";
import Episode from "../../models/episode.js";
import Community from "../../models/community.js";
import { broadcast } from "./events.js";

const communities = express.Router();

/*
- [x] GET     /episodes/:episode/communities;
- [X] POST    /episodes/:episode/communities;
- [X] GET     /episodes/:episode/communities/:community?view=card;
- [X] PATCH   /episodes/:episode/communities/:community;
- [ ] DELETE  /episodes/:episode/communities/:community;
*/

communities.get("/episodes/:id/communities", (req, res) => {
  const { id } = req.params;
  const { view = "list", layout = "none" } = req.query;

  try {
    const episode = Episode.load(id);

    res.render(`communities/${view}`, { episode, layout })
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});


communities.post("/episodes/:id/communities", (req, res) => {
  try {
    const { id } = req.params;
    const { society_id } = req.body;

    const episode = Episode.load(id);
    const society = episode.getSocietyById(society_id);
    const community = new Community(req.body);

    society.addCommunity(community);
    episode.addCommunity(community);
    episode.save();
    
    const currentUrl = req.get("hx-current-url");
    if (currentUrl) res.setHeader("HX-Location", currentUrl);
    res.sendStatus(201);

    broadcast("resources");
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

communities.get("/episodes/:id/communities/:community_id", (req, res) => {
  try {
    const { community_id, id } = req.params;
    const { view = "card", layout = "none" } = req.query;

    const episode = Episode.load(id);
    const community = episode.getCommunityById(community_id);

    res.render(`communities/${view}`, {community, layout});
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

communities.patch("/episodes/:id/communities/:community_id", (req, res) => {
  try {
    const { community_id, id } = req.params;
    const { society_id, resource_ids = [] } = req.body;

    const episode = Episode.load(id);
    const community = episode.getCommunityById(community_id);
    
    //update resources
    const resources = resource_ids.map(episode.getResourceById);
    community.resources = resources;

    //update societies (encapsulate!)
    const prevSociety = episode.societies.find(society => society.getCommunityById(community_id));
    const nextSociety = episode.getSocietyById(society_id);

    if( prevSociety && nextSociety && prevSociety != nextSociety ) {
      prevSociety.removeCommunity(community);
      nextSociety.addCommunity(community);
    }

    episode.save();

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