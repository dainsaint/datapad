import express from "express";
import Session from "../models/session.js";
// import {
//   getAllCommunities,
//   getAllGames,
//   getAllPlayers,
//   getAllSessions,
//   getAllSocieties,
//   getSessionById,
// } from "../core/data-access-layer.js";

const jsonRouter = express.Router();

//TODO: rewrite with new logic

jsonRouter.use((req, res, next) => {
  res.type("json");
  next();
})

jsonRouter.get("/game", (req, res) => {
  // res.send(getAllGames());
});

jsonRouter.get("/session", (req, res) => {
  // res.send(getAllSessions());
});

jsonRouter.get("/session/:id", (req, res) => {
  const { id } = req.params;
  const session = Session.load(id)
  res.send(session);
});

jsonRouter.get("/community", (req, res) => {
  // res.send(getAllCommunities());
});

jsonRouter.get("/player", (req, res) => {
  // res.send(getAllPlayers());
});

jsonRouter.get("/society", (req, res) => {
  // res.send(getAllSocieties());
});




jsonRouter.use((err, req, res, next)=> {
  res.status(err.status || 400).json()
})

export default jsonRouter;
