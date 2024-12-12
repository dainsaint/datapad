import express from "express";

import PhaseCard, { PhaseTime } from "../components/PhaseCard.js";
import App from "../components/App.js";
import DialogCreateGame from "../components/DialogCreateGame.js";
import DialogCreateSociety from "../components/DialogCreateSociety.js";
import Facilitator, { CommunityCard } from "../components/Facilitator.js";
import GameCard from "../components/GameCard.js";
import GameMaster, { SocietyCardList } from "../components/GameMaster.js";
import GameOverview from "../components/GameOverview.js";
import Home from "../components/Home.js";
import Script from "../components/Script.js";


import { populateDummyData } from "../populate.js";
import societyRouter from "./routes/societies.js";

import Session from "../models/session.js";
import Community from "../models/community.js";

const htmlRouter = express.Router();
const clients = new Set();

// populateDummyData();


// ADDITIONAL FUNCTIONS
/////////////////////////////////////

export function broadcast(name, data) {
  for (const client of clients)
    client.write(`event: ${name}\ndata: ${data}\n\n`);
};

//TODO: Handle active sessions
export function tick(deltaTime) {
  try {
    // const session = getActiveSession();
    // const activePhases = session.phases.filter( phase => phase.isPlaying );
    // for( const phase of activePhases ){
    //   phase.tick(deltaTime);
    //   updatePhase(phase, {});
    //   broadcast("phases");
    // }
  } catch(e) {

  }
}

// PAGES
/////////////////////////////////////

"/games/:game";

"/sessions/create";
"/sessions/:session/gm";
"/sessions/:session?view=gm";
"/sessions/:session?view=facilitator";
"/sessions/:session?view=script";

"/sessions/:session/societies/:society";
"/sessions/:session/societies/:society/edit";

"/sessions/:session/players";
"/sessions/:session/players/create";
"/sessions/:session/players/:player";
"/sessions/:session/players/:player/edit";

"/sessions/:session/communities/:community";
"/sessions/:session/communities/:community?view=card";
"/sessions/:session/communities/:community/edit";

"/sessions/:session/resources/create";
"/sessions/:session/resources/:resource";
"/sessions/:session/resources/:resource?view=card";
"/sessions/:session/resources/:resource/edit";

"/sessions/:session/phases/create";
"/sessions/:session/phases/:phase";
"/sessions/:session/phases/:phase?view=card";
"/sessions/:session/phases/:phase?view=time";
"/sessions/:session/phases/:phase/edit";

"/players/:player";

"/events";


htmlRouter.get("/sessions/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { view = "gm" } = req.query;

    const views = {
      gm: GameMaster,
      facilitator: Facilitator,
      script: Script,
    };

    const session = Session.load(id);
    const View = views[view];

    res.send(App(View(session)));
  } catch (e) {
    res.status(404).send(e.toString());
  }
});



// htmlRouter.get("/", (req, res) => {
//   try {
//     const games = getAllGames();
//     const session = getActiveSession();
    
//     res.send(App(Home(games, session)));
//   } catch(e) {
//     res.sendStatus(404); 
//   }
// });





htmlRouter.use("/", societyRouter)







// GAME
/////////////////////////////////////

// htmlRouter.post("/game", (req, res) => {
//   createGame(req.body);
// });

// htmlRouter.get("/game/:id", (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const game = getGameById(id);
//     res.send(App(GameOverview(game)));
//   } catch (e) {
//     res.sendStatus(404);
//   }
// });




// PHASES
/////////////////////////////////////


htmlRouter.get("/sessions/:id/phases/:phase_id", (req, res) => {
  try {
    const { id, phase_id } = req.params;
    const { view = "card" } = req.query;

    const session = Session.load(id);
    const phase = session.getPhaseById(phase_id);

    const views = {
      card: PhaseCard,
      time: PhaseTime,
    };

    const View = views[view];

    res.send(View(phase));
  } catch (e) {
    res.status(400).send(e);
  }
});


htmlRouter.put("/sessions/:id/phases/:phase_id", (req, res) => {
  try {
    const { id, phase_id } = req.params;
    const { action } = req.body;

    const session = Session.load(id);
    const phase = session.getPhaseById(phase_id);

    //TODO: handle this logic better, with the mutability problem
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

    session.save();

    //this is the way to "refresh" whatever page
    //this was called from using ajax
    const currentUrl = req.get("hx-current-url");
    if (currentUrl) res.setHeader("HX-Location", currentUrl);

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});





// COMMUNITY
/////////////////////////////////////

htmlRouter.post("/sessions/:session_id/communities", (req, res) => {
  const { session_id } = req.params;
  const { society_id } = req.body;

  try {
    const session = Session.load(session_id);
    const society = session.getSocietyById(society_id);
    const community = Community(req.body);

    society.addCommunity(community);
    session.addCommunity(community);
    session.save();

    res.sendStatus(201);
    broadcast("resources");
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

htmlRouter.patch("/sessions/:session_id/communities/:community_id", (req, res) => {
  
  try {
    const { community_id, session_id } = req.params;
    const { resource_ids = [] } = req.body;

    const session = Session.load(session_id);
    const community = session.getCommunityById(community_id);
    const resources = resource_ids.map(session.getResourceById);
    community.resources = resources;
    
    session.save();
    
    res.sendStatus(200);
    broadcast("resources");
  } catch(e) {
    console.log(e);
    res.sendStatus(400);
  }
  
});

htmlRouter.get("/sessions/:session_id/communities/:community_id/:view?", (req, res) => {
  try {
    const { community_id, session_id, view = "card" } = req.params;

    const session = Session.load(session_id);
    const community = session.getCommunityById(community_id);
    
    const Views = {
      card: CommunityCard
    }

    const View = Views[view];

    res.send( View(community) );
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


// htmlRouter.get("/ui/game/card/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const game = getGameById(id);
//     res.send( GameCard(game) );
//   } catch(error) {
//     next(error)
//   }
// });

// SOCIETY UI

htmlRouter.post("/ui/society/create", (req, res) => {
  try {
    const { session_id } = req.body;
    const session = Session.load(session_id);
    res.send(DialogCreateSociety(session));
  } catch (e) {
    res.status(400).send("");
  }
});

htmlRouter.get("/ui/society/list/:session_id", (req, res) => {
  try {
    const { session_id } = req.params;
    const session = Session.load(session_id);
    res.send(SocietyCardList(session));
  } catch (e) {
    res.status(400).send("");
  }
});


// COMMUNITY UI
htmlRouter.get("/sessions/:id/communities/:community_id", (req, res) => {
  try {
    const { id, community_id } = req.params;
    const { view = "card" } = req.query;

    const session = Session.load(id);
    const community = session.getCommunityById(community_id);

    const views = {
      card: CommunityCard,
    };

    const View = views[view];

    res.send( View(community) );
  } catch (e) {
    res.status(400).send(e);
  }
});



// PHASE UI


export default htmlRouter;