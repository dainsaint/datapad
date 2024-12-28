import express from "express";
import Episode from "../models/episode.js";
import Ledger from "../models/ledger.js";

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

jsonRouter.get("/episodes/:id", (req, res) => {
  const { id } = req.params;
  const episode = Episode.load(id)
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