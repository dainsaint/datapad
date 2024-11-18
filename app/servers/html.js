import express from "express";
import Database from "../core/database.js";

import Game from "../models/game.js";

import GameCard from "../components/GameCard.js";
import GameOverview from "../components/GameOverview.js";
import Layout from "../components/Layout.js";
import SessionOverview from "../components/SessionOverview.js";
import GameMaster from "../components/GameMaster.js";
import Home from "../components/Home.js";

import { populateDummyData } from "../populate.js";
import LayoutToolbar from "../components/LayoutToolbar.js";


const htmlRouter = express.Router();
const db = Database.open("data.json");


htmlRouter.get("/", (req, res) => {
  const game = db.data.games.at(0);
  const currentSession = db.data.sessions[game._id].at(0);

  if (!currentSession) return res.send(Layout(""));

  res.send(Layout(Home(db.data.games, currentSession)));
});

htmlRouter.post("/game", (req, res) => {
  db.update(({ games }) => {
    games.push(new Game());
  });
});

htmlRouter.get("/game/:id", (req, res) => {
  let content = "";

  const game = db.data.games.find((g) => g._id == req.params.id);

  if (game) {
    content = GameOverview(game);
  }

  res.send(Layout(content));
});

htmlRouter.get("/game/ui/card/:id", (req, res) => {
  const game = db.data.games.find((g) => g._id == req.params.id);
  let response = "Couldn't find it :(";

  if (game) {
    response = GameCard(game);
  }

  res.send(response);
});

htmlRouter.get("/session/:game_id/:session_id", (req, res) => {
  const { game_id, session_id } = req.params;

  const session = db.data.sessions?.[game_id]?.find(
    (session) => session._id == session_id
  );

  if (!session) return res.send(Layout());

  res.send(Layout(SessionOverview(session)));
});

htmlRouter.get("/gm", (req, res) => {
  let content = "";

  //TODO: Logic for figuring out what the active/current game session is
  const game = db.data.games.at(0);

  if (!game) return res.send(Layout(content));

  const session = db.data.sessions[game._id].at(0);

  if (!session) return res.send(Layout(content));

  res.send( Layout(GameMaster(session)) );
});



export default htmlRouter;

