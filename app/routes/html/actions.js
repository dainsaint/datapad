import express from "express";
import Action from "#models/action";
import Episode from "#models/episode";
import { broadcast } from "#routes/html/events";

const actions = express.Router();

actions.post("/episodes/:episodeId/actions", (req, res, next) => {
  const { episodeId } = req.params;
  const { societyId } = req.body;

  const episode = Episode.load(episodeId);
  const society = episode.getSocietyById(societyId);
  
  const action = new Action({ society: societyId });
  episode.addAction(action);

  console.log( action );
  
  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);
  
  res.location( action.toURL() )
  res.sendStatus(201);

  broadcast("actions");
});

export default actions;