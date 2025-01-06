import Ledger from "#database/ledger";
import Episode from "#models/episode";
import express from "express";


const jsonRouter = express.Router();

jsonRouter.use((req, res, next) => {
  res.type("json");
  next();
})

jsonRouter.get("/games", (req, res) => {
  res.send(Ledger.games);
});

jsonRouter.get("/episodes", (req, res) => {
  res.send(Ledger.episodes);
});

jsonRouter.get("/episodes/:episodeId", (req, res) => {
  const { episodeId } = req.params;
  const episode = Episode.load(episodeId)
  res.send(episode);
});

//TODO: These requests should be scoped to either a specific society, or the active society (if one exists)
jsonRouter.get("/communities", (req, res) => {
  const activeEpisode = Ledger.getActiveEpisode();
  const communities = activeEpisode?.communities || [];
  res.send(communities);
});

jsonRouter.get("/players", (req, res) => {
  const activeEpisode = Ledger.getActiveEpisode();
  const players = activeEpisode?.players || [];
  res.send(players);
});

jsonRouter.get("/societies", (req, res) => {
  const activeEpisode = Ledger.getActiveEpisode();
  const societies = activeEpisode?.societies || [];
  res.send(societies);
});

jsonRouter.use((err, req, res, next)=> {
  res.status(err.status || 400).json()
})

export default jsonRouter;