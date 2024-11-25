import express from "express";
import Database from "../core/database.js";

import Game from "../models/game.js";

import App from "../components/App.js";
import GameCard from "../components/GameCard.js";
import GameOverview from "../components/GameOverview.js";
import GameMaster from "../components/GameMaster.js";
import Home from "../components/Home.js";

import { populateDummyData } from "../populate.js";
import DialogCreateGame from "../components/DialogCreateGame.js";
import DialogCreateSociety from "../components/DialogCreateSociety.js";
import Society from "../models/society.js";
import Facilitator from "../components/Facilitator.js";
import Script from "../components/Script.js";


const htmlRouter = express.Router();
const db = Database.open("data.json");


// PAGES
/////////////////////////////////////

htmlRouter.get("/", (req, res) => {
  try {
    const activeSession = db.data.active.session;
    res.send(App(Home(db.data.games, activeSession)));
  } catch(e) {
    res.sendStatus(404); 
  }
});

htmlRouter.get("/gm", (req, res) => {
  try {
    const session = db.data.active.session;
    res.send(App(GameMaster(session)));
  } catch (e) {
    res.sendStatus(404); 
  }
});

htmlRouter.get("/facilitator", (req, res) => {
  try {
    const session = db.data.active.session
    res.send(App(Facilitator(session)));
  } catch (e) {
    res.sendStatus(404); 
  }
});

htmlRouter.get("/script", (req, res) => {
  try {
    const session = db.data.active.session;
    res.send(App(Script(session)));
  } catch (e) {
    res.sendStatus(404);
  }
});



// GAME
/////////////////////////////////////

htmlRouter.post("/game", (req, res) => {
  db.update(({ games }) => {
    games.push(new Game());
  });
});

htmlRouter.get("/game/:id", (req, res, next) => {
  try {
    const game = db.data.games.find((g) => g._id == req.params.id);
    res.send(App(GameOverview(game)));
  } catch (e) {
    res.sendStatus(404);
  }
});


// SOCIETY
/////////////////////////////////////

htmlRouter.post("/society", (req, res) => {
  const{ session_id, name, archetype } = req.body;

  db.update(data => {
    try {
      //yikes this ain't it
      const session = db.data.sessions.find((session) => session._id == session_id);
      
      const society = new Society(name);
      society.archetype = archetype;

      session.societies.push( society );
      data.societies[session._id].push( society );
      res.sendStatus(200);

    } catch(e) {
      console.log( e );
      res.sendStatus(400);
    }
  });

});


// UI
/////////////////////////////////////

htmlRouter.get("/ui/game/card/:id", (req, res) => {
  try {
    const game = db.data.games.find((g) => g._id == req.params.id);
    res.send( GameCard(game) );
  } catch(e) {
    res.status(400).send("");
  }
});

htmlRouter.get("/ui/game/create", (req, res) => {
  res.send( DialogCreateGame() );
});


htmlRouter.get("/ui/society/create", (req, res) => {
  try {
    //TODO: Logic for figuring out what the active/current game session is
    const game = db.data.games.at(0);
    const session = game.sessions.at(0);
    res.send(DialogCreateSociety(game, session));
  } catch (e) {
    res.status(400).send("");
  }
});



export default htmlRouter;

