import express from "express";
import Session from "../models/session.js";
import Ledger from "../models/ledger.js";

const jsonRouter = express.Router();

jsonRouter.use((req, res, next) => {
  res.type("json");
  next();
})

jsonRouter.get("/games", (req, res) => {
  res.send(Ledger.games);
});

jsonRouter.get("/sessions", (req, res) => {
  res.send(Ledger.sessions);
});

jsonRouter.get("/sessions/:id", (req, res) => {
  const { id } = req.params;
  const session = Session.load(id)
  res.send(session);
});

//TODO: These requests should be scoped to either a specific society, or the active society (if one exists)
jsonRouter.get("/communities", (req, res) => {
  const activeSession = Ledger.getActiveSession();
  const communities = activeSession?.communities || [];
  res.send(communities);
});

jsonRouter.get("/players", (req, res) => {
  const activeSession = Ledger.getActiveSession();
  const players = activeSession?.players || [];
  res.send(players);
});

jsonRouter.get("/societies", (req, res) => {
  const activeSession = Ledger.getActiveSession();
  const societies = activeSession?.societies || [];
  res.send(societies);
});

jsonRouter.use((err, req, res, next)=> {
  res.status(err.status || 400).json()
})

export default jsonRouter;