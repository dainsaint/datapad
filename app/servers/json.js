import express from "express";
import Database from "../core/database.js";

const jsonRouter = express.Router();
const database = Database.open("data.json");


jsonRouter.use((req, res, next) => {
  res.type("json");
  next();
})

jsonRouter.get("/game", (req, res) => {
  res.send(database.data.games);
});

jsonRouter.get("/session", (req, res) => {
  res.send(database.data.sessions);
});

jsonRouter.get("/session/:session_id", (req, res) => {
  const { session_id } = req.params;
  const allSessions = Object.values( database.data.sessions ).flat();
  
  const session = allSessions?.find( (session) => session._id === session_id );
  res.send(session);
});

jsonRouter.get("/session/:game_id/:session_id", (req, res) => {
  const { game_id, session_id } = req.params;
  const session = database.data.sessions?.[game_id]?.find(
    (session) => session._id === session_id
  );
  res.send(session);
});

jsonRouter.get("/community", (req, res) => {
  res.send(database.data.communities);
});

jsonRouter.get("/player", (req, res) => {
  res.send(database.data.players);
});

jsonRouter.get("/society", (req, res) => {
  res.send(database.data.societies);
});




jsonRouter.use((err, req, res, next)=> {
  res.status(err.status || 400).json()
})

export default jsonRouter;
