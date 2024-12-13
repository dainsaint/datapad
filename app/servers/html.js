import express from "express";

import communities from "./routes/communityRoutes.js";
import events, { tick as eventTick } from "./routes/eventRoutes.js";
import games from "./routes/gameRoutes.js";
import phases from "./routes/phaseRoutes.js";
import players from "./routes/playerRoutes.js";
import resources from "./routes/resourceRoutes.js";
import sessions from "./routes/sessionRoutes.js";
import societies from "./routes/societyRoutes.js";
import home from "./routes/homeRoutes.js";

import { populateDummyData } from "../populate.js";

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