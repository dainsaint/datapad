import express from "express";
import Session from "../../models/session.js";
import Community from "../../models/community.js";
import { CommunityCard } from "../../components/Facilitator.js";
import { broadcast } from "./eventRoutes.js";

const communities = express.Router();

/*
- [ ] GET     /sessions/:session/communities;
- [X] POST    /sessions/:session/communities;
- [X] GET     /sessions/:session/communities/:community?view=card;
- [X] PATCH   /sessions/:session/communities/:community;
- [ ] DELETE  /sessions/:session/communities/:community;
- [ ] GET     /sessions/:session/communities/:community/edit;
*/

communities.post("/sessions/:session_id/communities", (req, res) => {
  const { session_id } = req.params;
  const { society_id } = req.body;

  try {
    const session = Session.load(session_id);
    const society = session.getSocietyById(society_id);
    const community = Community(req.body);

    society.addCommunity(community);
    session.addCommunity(community);
    session.save();

    res.sendStatus(201);
    broadcast("resources");
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

communities.patch("/sessions/:session_id/communities/:community_id", (req, res) => {
  try {
    const { community_id, session_id } = req.params;
    const { resource_ids = [] } = req.body;

    const session = Session.load(session_id);
    const community = session.getCommunityById(community_id);
    const resources = resource_ids.map(session.getResourceById);
    community.resources = resources;

    session.save();

    res.sendStatus(200);
    broadcast("resources");
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

communities.get("/sessions/:session_id/communities/:community_id", (req, res) => {
  try {
    const { community_id, session_id } = req.params;
    const { view = "card" } = req.query;

    const session = Session.load(session_id);
    const community = session.getCommunityById(community_id);

    const Views = {
      card: CommunityCard,
    };

    const View = Views[view];

    res.send(View(community));
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

export default communities;