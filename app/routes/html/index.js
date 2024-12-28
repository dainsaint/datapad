import express from "express";

import communities from "./communities.js";
import events, { tick as eventTick } from "./events.js";
import games from "./games.js";
import phases from "./phases.js";
import players from "./players.js";
import resources from "./resources.js";
import episodes from "./episodes.js";
import societies from "./societies.js";
import pages from "./pages.js";

const htmlRouter = express.Router();

htmlRouter.use("/", communities);
htmlRouter.use("/", events);
htmlRouter.use("/", games);
htmlRouter.use("/", phases);
htmlRouter.use("/", players);
htmlRouter.use("/", resources);
htmlRouter.use("/", episodes);
htmlRouter.use("/", societies);
htmlRouter.use("/", pages);

export default htmlRouter;
export const tick = eventTick;