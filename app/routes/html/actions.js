import express from "express";
import Action from "#models/action";
import Episode from "#models/episode";
import { broadcast } from "#routes/html/events";
import { ActionBuilder } from "#views/societies/panel";

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

actions.post("/episodes/:episodeId/actions/:actionId/primary", (req, res, next) => {
  const { episodeId, actionId } = req.params;
  const { resourceIds } = req.body;
  console.log( req.body );
  // console.log('primary');
  const episode = Episode.load(episodeId);
  const action = episode.getActionById(actionId);
  const society = episode.getSocietyById(action.society);
  // const resource = episode.getResourceById( resourceIds.at(0) );

  // action.setPrimaryResource(resource);
  // episode.save();

  res.send( ActionBuilder({ episode, society}) );
});

actions.post("/episodes/:episodeId/actions/:actionId/additional", (req, res, next) => {
  const { episodeId, actionId } = req.params;
  const { resourceIds } = req.body;
  console.log("addtl");
  const episode = Episode.load(episodeId);
  const action = episode.getActionById(actionId);
  const society = episode.getSocietyById(action.society);
  const resources = resourceIds.map( id => episode.getResourceById(id) );

  action.setAdditionalResources(resources);
  episode.save();

  res.send( ActionBuilder({ episode, society}) );
});


export default actions;