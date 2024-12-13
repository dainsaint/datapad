import express from "express";

import communities from "./routes/communities.js";
import events, { tick as eventTick } from "./routes/events.js";
import games from "./routes/games.js";
import phases from "./routes/phases.js";
import players from "./routes/players.js";
import resources from "./routes/resources.js";
import sessions from "./routes/sessions.js";
import societies from "./routes/societies.js";
import home from "./routes/home.js";

import { populateDummyData } from "../populate.js";

// populateDummyData();

const htmlRouter = express.Router();

htmlRouter.use("/", communities);
htmlRouter.use("/", events);
htmlRouter.use("/", games);
htmlRouter.use("/", phases);
htmlRouter.use("/", players);
htmlRouter.use("/", resources);
htmlRouter.use("/", sessions);
htmlRouter.use("/", societies);
htmlRouter.use("/", home);

export default htmlRouter;
export const tick = eventTick;