import express from "express";

import actions from "#routes/html/actions";
import communities from "#routes/html/communities";
import documents from "#routes/html/documents";
import downloads from "#routes/html/downloads";
import events, { tick as eventTick } from "#routes/html/events";
import games from "#routes/html/games";
import phases from "#routes/html/phases";
import players from "#routes/html/players";
import resources from "#routes/html/resources";
import episodes from "#routes/html/episodes";
import societies from "#routes/html/societies";
import pages from "#routes/html/pages";

const htmlRouter = express.Router();

htmlRouter.use("/", actions);
htmlRouter.use("/", communities);
htmlRouter.use("/", documents);
htmlRouter.use("/", downloads);
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