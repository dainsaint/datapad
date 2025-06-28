import express from "express";
import Episode from "#models/episode";
import { broadcast } from "#routes/html/events";

const turns = express.Router();

////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////


turns.post("/:episodeId/:societyId/:round", async (req, res, next) => {
  try {
  const { episodeId, round, societyId } = req.params;

  const episode = await Episode.load(episodeId);
  const turn = episode.getTurnByRound(societyId, round);
  turn.update( req.body )
  episode.save();

  res.sendStatus(200);
  broadcast("societies");
} catch(err) {
  next(err);
}
})

turns.get("/:episodeId/:societyId/:round/:view?", async (req, res, next) => {
  try {
  const { episodeId, round, societyId, view } = req.params;

  const episode = await Episode.load(episodeId);
  const turn = episode.getTurnByRound(societyId, round);

  res.render(`turns/${view}`, { turn });
} catch(err) {
  next(err);
}
})


turns.post("/:episodeId/:societyId/:round/leadership", async (req, res, next) => {
  try {
  const { episodeId, societyId, round } = req.params;

  console.log( req.body );

  const episode = await Episode.load(episodeId);
  const turn = episode.getTurnByRound(societyId, round);

  
  // episode.save();

  res.sendStatus(200);
  broadcast("societies");
} catch(err) {
  next(err);
}
})


export default turns;
