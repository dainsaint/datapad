import express from "express";

const events = express.Router();
const clients = new Set();

export function broadcast(name, data) {
  for (const client of clients)
    client.write(`event: ${name}\ndata: ${data}\n\n`);
};

export function tick(deltaTime) {
  try {
    // const session = getActiveSession();
    // const activePhases = session.phases.filter( phase => phase.isPlaying );
    // for( const phase of activePhases ){
    //   phase.tick(deltaTime);
    //   updatePhase(phase, {});
    //   broadcast("phases");
    // }
  } catch (e) {}
}


/*
- [ ] GET     /events;
- [ ] POST    /events;
*/

events.get("/events", (req, res) => {
  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Add client to Set
  clients.add(res);
  broadcast("welcome");

  // Handle client disconnect
  req.on("close", () => {
    clients.delete(res);
  });
});

events.post("/events", (req, res) => {
  const { data } = req.body;
  broadcast(data);
});


export default events;