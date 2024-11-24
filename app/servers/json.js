import express from "express";
import Database from "../core/database.js";

const jsonRouter = express.Router();
const database = Database.open("data.json");

const clients = new Set();

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



jsonRouter.get('/events', (req, res) => {
    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    console.log("new SSE attempt...")
    // Send initial connection message
    res.write('data: Connected to event stream\n\n');

    // Add client to Set
    clients.add(res);

    // Handle client disconnect
    req.on('close', () => {
        clients.delete(res);
    });
});


// Example endpoint to trigger events
jsonRouter.get('/trigger-event', express.json(), (req, res) => {
    // const eventData = req.body;
    const eventData =  "woah cool new thing!";
    
    // Send event to all connected clients
    clients.forEach(client => {
        client.write(`data: ${JSON.stringify(eventData)}\n\n`);
    });
    
    res.status(200).json({ message: 'Event sent to all clients' });
});
jsonRouter.use((err, req, res, next)=> {
  res.status(err.status || 400).json()
})

export default jsonRouter;
