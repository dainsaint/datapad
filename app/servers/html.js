import express from "express";

import communities from "./routes/community-routes.js";
import events, { tick as eventTick } from "./routes/event-routes.js";
import games from "./routes/game-routes.js";
import phases from "./routes/phase-routes.js";
import players from "./routes/player-routes.js";
import resources from "./routes/resource-routes.js";
import sessions from "./routes/session-routes.js";
import societies from "./routes/society-routes.js";
import home from "./routes/home-routes.js";

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