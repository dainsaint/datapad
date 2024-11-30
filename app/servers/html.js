import express from "express";
import Database from "../core/database.js";

import Game from "../models/game.js";

import App from "../components/App.js";
import GameCard from "../components/GameCard.js";
import GameOverview from "../components/GameOverview.js";
import GameMaster, { SocietyCardList } from "../components/GameMaster.js";
import Home from "../components/Home.js";

import { populateDummyData } from "../populate.js";
import DialogCreateGame from "../components/DialogCreateGame.js";
import DialogCreateSociety from "../components/DialogCreateSociety.js";
import Society from "../models/society.js";
import Facilitator, { CommunityCard } from "../components/Facilitator.js";
import Script from "../components/Script.js";

const htmlRouter = express.Router();
const db = Database.open("data.json");
const clients = new Set();

// populateDummyData();

// SSE
/////////////////////////////////////

const broadcast = (name, data) => {
  console.log("broadcasting", name, data);
  for (const client of clients)
    client.write(`event: ${name}\ndata: ${data}\n\n`);
};

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

htmlRouter.get("/facilitator/:society_id?", (req, res) => {
  try {
    const { society_id } = req.params;
    const session = db.data.active.session;
    const society = session.societies.find( society => society._id === society_id) || session.societies.at(0);
    res.send(App(Facilitator(session, society)));
  } catch (e) {
    console.log( e );
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

htmlRouter.put("/society", (req, res) => {
  const{ session_id, _id, name, archetype, ui } = req.body;

  db.update(data => {
    try {
      const session = data.sessions.find((session) => session._id == session_id);
      let society = data.societies[session._id].find( society => society._id === _id );

      if( !society ) { // new
        society = new Society(name);
        session.societies.push( society );
        data.societies[session_id].push( society );
      }
      
      society.name = name;
      society.archetype = archetype;

      res.setHeader("HX-Trigger", "success");
      res.sendStatus(200);
      broadcast("societies");

    } catch(e) {
      console.log( e );
      res.setHeader("HX-Trigger", "error");
      res.sendStatus(400);
    }
  });

});


// COMMUNITY
/////////////////////////////////////

htmlRouter.post("/community/:community_id/resources", (req, res) => {
  const { community_id } = req.params;
  const { session_id, resource_ids = [], ui } = req.body;

  db.update(data => {
    try {
      const community = data.communities[session_id].find( x => community_id === x._id );
      const updatedResources = resource_ids.map( resource_id => data.resources[session_id].find( x => resource_id == x._id ) );
      //TODO: track from where to where (maybe)
      community.resources = updatedResources;
  
      if( ui )
        res.redirect(ui);
      else
        res.sendStatus(200);

      broadcast("resources");

    } catch(e) {
      console.log( e );
      res.sendStatus(400);
    }
  });

});



// SSE
/////////////////////////////////////


htmlRouter.get('/events', (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  console.log("New client connected")
  // Send initial connection message

  // Add client to Set
  clients.add(res);
  broadcast("welcome");

  // Handle client disconnect
  req.on('close', () => {
    clients.delete(res);
  });
});

htmlRouter.post('/events', (req, res) => {
  const { data } = req.body;
  broadcast(data);
});


// UI
/////////////////////////////////////

// GAME UI

htmlRouter.get("/ui/game/create", (req, res) => {
  res.send(DialogCreateGame());
});


htmlRouter.get("/ui/game/card/:id", async (req, res, next) => {
  try {
    const game = db.data.games.find((g) => g._id == req.params.id);
    res.send( GameCard(game) );
  } catch(error) {
    next(error)
  }
});

// SOCIETY UI

htmlRouter.post("/ui/society/create", (req, res) => {
  try {
    const { session_id } = req.body;
    const session = db.data.sessions.find( x => x._id === session_id );
    res.send(DialogCreateSociety(session));
  } catch (e) {
    res.status(400).send("");
  }
});

htmlRouter.get("/ui/society/list/:session_id", (req, res) => {
  try {
    const { session_id } = req.params;
    const session = db.data.sessions.find((x) => x._id === session_id);
    res.send(SocietyCardList(session));
  } catch (e) {
    res.status(400).send("");
  }
});


// COMMUNITY UI

htmlRouter.get("/ui/community/card/:session_id/:community_id", (req, res) => {
  try {
    const { session_id, community_id } = req.params;
    const session = db.data.sessions.find( x => session_id === x._id );
    const community = db.data.communities[session_id].find((x) => x._id === community_id );

    res.send( CommunityCard( session, community ));
  } catch (e) {
    res.status(400).send("");
  }
});

export default htmlRouter;