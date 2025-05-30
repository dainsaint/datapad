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
import turns from "#routes/html/turns";
import pages from "#routes/html/pages";

const htmlRouter = express.Router();

htmlRouter.use("/actions", actions);
htmlRouter.use("/communities", communities);
htmlRouter.use("/documents", documents);
htmlRouter.use("/downloads", downloads);
htmlRouter.use("/events", events);
htmlRouter.use("/games", games);
htmlRouter.use("/phases", phases);
htmlRouter.use("/players", players);
htmlRouter.use("/resources", resources);
htmlRouter.use("/episodes", episodes);
htmlRouter.use("/societies", societies);
htmlRouter.use("/turns", turns);
htmlRouter.use("/", pages);

export default htmlRouter;
export const tick = eventTick;