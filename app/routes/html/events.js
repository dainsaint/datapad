import express from "express";
import Ledger from "#database/ledger";

const events = express.Router();
const clients = new Set();

export function broadcast(name, data) {
  for (const client of clients)
    client.write(`event: ${name}\ndata: ${data}\n\n`);
}

export function tick(deltaTime) {
  try {
    const activeEpisode = Ledger.getActiveEpisodeCached();
    const activePhases = activeEpisode?.phases?.filter((phase) => phase.isPlaying);

    for (const phase of activePhases) {
      phase.tick(deltaTime);
      broadcast("phases");
      episode.save();
    }

  } catch (e) {}
}

/*
- [X] GET     /events;
- [X] POST    /events;
*/

events.get("/", async (req, res) => {
  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Add client to Set
  clients.add(res);
  broadcast("welcome");

  // Handle client disconnect
  req.on("close", () => {
    clients.delete(res);
    res.end();
  });
});

events.post("/", async (req, res) => {
  const { data } = req.body;
  broadcast(data);
});

export default events;
