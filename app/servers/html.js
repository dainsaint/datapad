import express from "express";

import { PhaseTime } from "../components/PhaseCard.js";
import App from "../components/App.js";
import DialogCreateGame from "../components/DialogCreateGame.js";
import DialogCreateSociety from "../components/DialogCreateSociety.js";
import Facilitator, { CommunityCard } from "../components/Facilitator.js";
import GameCard from "../components/GameCard.js";
import GameMaster, { SocietyCardList } from "../components/GameMaster.js";
import GameOverview from "../components/GameOverview.js";
import Home from "../components/Home.js";
import Script from "../components/Script.js";

import {
  addSocietyToSession,
  createGame,
  createSociety,
  deleteSociety,
  getActiveSession,
  getAllGames,
  getCommunityById,
  getGameById,
  getResourceById,
  getSessionById,
  getSocietyById,
  updateCommunity,
  updatePhase,
  updateSociety,
} from "../core/data-access-layer.js";

import { populateDummyData } from "../populate.js";


const htmlRouter = express.Router();
const clients = new Set();

// populateDummyData();


// ADDITIONAL FUNCTIONS
/////////////////////////////////////

export function broadcast(name, data) {
  for (const client of clients)
    client.write(`event: ${name}\ndata: ${data}\n\n`);
};

export function tick(deltaTime) {
  try {
    const session = getActiveSession();
    const activePhases = session.phases.filter( phase => phase.isPlaying );
    for( const phase of activePhases ){
      phase.tick(deltaTime);
      updatePhase(phase, {});
      broadcast("phases");
    }
  } catch(e) {

  }
}

// PAGES
/////////////////////////////////////

htmlRouter.get("/", (req, res) => {
  try {
    const games = getAllGames();
    const session = getActiveSession();
    
    res.send(App(Home(games, session)));
  } catch(e) {
    res.sendStatus(404); 
  }
});

htmlRouter.get("/gm", (req, res) => {
  try {
    const session = getActiveSession();
    res.send(App(GameMaster(session)));
  } catch (e) {
    res.sendStatus(404); 
  }
});

htmlRouter.get("/facilitator/:society_id?", (req, res) => {
  try {
    const { society_id } = req.params;
    const session = getActiveSession();
    const society = getSocietyById(society_id) || session.societies.at(0);
    res.send(App(Facilitator(session, society)));
  } catch (e) {
    console.log( e );
    res.sendStatus(404); 
  }
});


htmlRouter.get("/script", (req, res) => {
  try {
    const session = getActiveSession();
    res.send(App(Script(session)));
  } catch (e) {
    res.sendStatus(404);
  }
});



// GAME
/////////////////////////////////////

htmlRouter.post("/game", (req, res) => {
  createGame(req.body);
});

htmlRouter.get("/game/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const game = getGameById(id);
    res.send(App(GameOverview(game)));
  } catch (e) {
    res.sendStatus(404);
  }
});


// SESSION
/////////////////////////////////////

htmlRouter.put("/session/:session_id/phase/:id", (req, res) => {
  try {
    const { session_id, id } = req.params;
    const { action } = req.body;

    const session = getSessionById(session_id);
    const phase = session.phases.find((phase) => phase._id == id);

    switch (action) {
      case "start":
        phase.startPhase();
        break;
      case "pause":
        phase.pausePhase();
        break;
      case "stop":
        phase.completePhase();
        break;
    }

    updatePhase(phase, {});

    //this is the way to "refresh" whatever page
    //this was called from using ajax
    const currentUrl = req.get("hx-current-url");
    if( currentUrl )
      res.setHeader("HX-Location", currentUrl);
    
    res.sendStatus(200);
  } catch(e) {
    console.log( e );
    res.sendStatus(404);
  }
});


// SOCIETY
/////////////////////////////////////

htmlRouter.post("/society", (req, res) => {
  const{ session_id, _id, name, archetype, ui } = req.body;

  try {
    const session = getSessionById(session_id);
    let society = getSocietyById(_id);

    if( !society ) {
      society = createSociety({name, archetype});
      addSocietyToSession(society, session);
    } else {
      updateSociety(society, {name, archetype});
    }
    res.setHeader("HX-Trigger", "success");
    res.sendStatus(201);
    broadcast("societies");
  } catch(e) {
    res.setHeader("HX-Trigger", "error");
    res.sendStatus(400);
  }

});


htmlRouter.delete("/society/:id", (req, res) => {
  const { id } = req.params;
  try {
    const society = getSocietyById(id);
    deleteSociety(society);

    res.setHeader("HX-Trigger", "success");
    res.sendStatus(200);
    broadcast("societies");
  } catch(e) {
    console.log( e );
    res.setHeader("HX-Trigger", "error");
    res.sendStatus(400);
  }
});



// COMMUNITY
/////////////////////////////////////

htmlRouter.patch("/community/:community_id", (req, res) => {
  const { community_id } = req.params;
  const { resource_ids = [] } = req.body;

  try {
    const community = getCommunityById(community_id);
    const resources = resource_ids.map(getResourceById);
    updateCommunity(community, {resources});
    
    res.sendStatus(200);
    broadcast("resources");
  } catch(e) {
    console.log(e);
    res.sendStatus(400);
  }
  
});



// SSE
/////////////////////////////////////


htmlRouter.get('/events', (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');


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
    const { id } = req.params;
    const game = getGameById(id);
    res.send( GameCard(game) );
  } catch(error) {
    next(error)
  }
});

// SOCIETY UI

htmlRouter.post("/ui/society/create", (req, res) => {
  try {
    const { session_id } = req.body;
    const session = getSessionById(session_id);
    res.send(DialogCreateSociety(session));
  } catch (e) {
    res.status(400).send("");
  }
});

htmlRouter.get("/ui/society/list/:session_id", (req, res) => {
  try {
    const { session_id } = req.params;
    const session = getSessionById(session_id);
    res.send(SocietyCardList(session));
  } catch (e) {
    res.status(400).send("");
  }
});


// COMMUNITY UI

htmlRouter.get("/ui/community/card/:id", (req, res) => {
  try {
    const { id } = req.params;
    const community = getCommunityById( id );
    res.send( CommunityCard(community));
  } catch (e) {
    res.status(400).send("");
  }
});


// PHASE UI
htmlRouter.get("/ui/phase/time/:id", (req, res) => {
  try {
    const { id } = req.params;
    const session = getActiveSession();
    const phase = session.phases.find( p => p._id == id);
    
    res.send( PhaseTime(phase) );
  } catch (e) {
    console.log(e);
    res.status(400).send("");
  }
});


export default htmlRouter;