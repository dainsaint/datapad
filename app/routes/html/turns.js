import express from "express";
import Episode from "#models/episode";
import { broadcast } from "#routes/html/events";

const turns = express.Router();

////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////


turns.post("/:episodeId/:societyId/:round", (req, res) => {
  const { episodeId, round, societyId } = req.params;

  const episode = Episode.load(episodeId);
  const turn = episode.getTurnByRound(societyId, round);
  turn.update( req.body )

console.log( req.body, turn.id );

  episode.save();

  res.sendStatus(200);
  broadcast("societies");
})


turns.post("/:episodeId/:round/:societyId/ambassador", (req, res) => {
  const { episodeId, round } = req.params;
  const { communityId, ambassadorSocietyId } = req.body;

  const episode = Episode.load(episodeId);
  const community = episode.getCommunityById(communityId);
  community.ambassadorSocietyId = ambassadorSocietyId;

  episode.save();

  res.sendStatus(200);
  broadcast("societies");
})



export default turns;
