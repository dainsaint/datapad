import express from "express";
import Action from "#models/action";
import Episode from "#models/episode";
import { broadcast } from "#routes/html/events";
import { ActionBuilder } from "#views/societies/panel";
import { filterUnique } from "#core/utils";

const actions = express.Router();

actions.get("/episodes/:episodeId/actions", (req, res, next) => {
  const { episodeId } = req.params;
  const { societyId } = req.query;

  const episode = Episode.load(episodeId);

  res.send(ActionBuilder({ episode, societyId }));
});


actions.post("/episodes/:episodeId/actions", (req, res, next) => {
  const { episodeId } = req.params;
  const { societyId } = req.body;

  const episode = Episode.load(episodeId);  
  const action = new Action({ society: societyId });
  episode.addAction(action);

  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);
  
  res.location( action.toURL() )
  res.sendStatus(201);

  broadcast("actions");
});


actions.post("/episodes/:episodeId/actions/:actionId/resources", (req, res, next) => {
  const { episodeId, actionId } = req.params;
  const { resourceIds = [], texts = [], risk, commit } = req.body;

  console.log( req.body );

  const episode = Episode.load(episodeId);
  const action = episode.getActionById(actionId);

  //Ensure unique
  const resources = resourceIds
    .filter( filterUnique )
    .map( episode.getResourceById );

  action.setResources(resources);
  action.texts = texts;
  action.risk = risk;
  
  if( commit )  {
    action.commit(); 
  }

  episode.save();

  // res.send( ActionBuilder({ episode, society}) );
  res.location(action.toURL());
  res.sendStatus(201);
  broadcast("actions");
});


export default actions;