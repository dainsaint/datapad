import express from "express";

import communities from "#modules/communities/routes";
import events, { tick as eventTick } from "#modules/events/routes";
import games from "#modules/games/routes";
import phases from "#modules/phases/routes";
import players from "#modules/players/routes";
import resources from "#modules/resources/routes";
import episodes from "#modules/episodes/routes";
import societies from "#modules/societies/routes";
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