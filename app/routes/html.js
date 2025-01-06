import express from "express";

import communities from "#modules/communities/communities";
import events, { tick as eventTick } from "#routes/html/events";
import games from "#routes/html/games";
import phases from "#modules/phases/phases";
import players from "#routes/html/players";
import resources from "#routes/html/resources";
import episodes from "#routes/html/episodes";
import societies from "#routes/html/societies";
import pages from "#modules/pages/routes";

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