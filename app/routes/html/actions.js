import express from "express";
import Action from "#models/action";
import Episode from "#models/episode";
import { broadcast } from "#routes/html/events";
import { filterUnique } from "#core/utils";

import ActionEdit from "#views/actions/edit";

const actions = express.Router();

actions.get("/:episodeId", async (req, res, next) => {
  try {
  const { episodeId } = req.params;
  const { societyId } = req.query;

  const episode = await Episode.load(episodeId);

  res.send(ActionEdit({ episode, societyId }));
} catch(err) {
  next(err);
}
});






actions.post("/:episodeId/:actionId/resources", async (req, res, next) => {
  try {
  const { episodeId, actionId } = req.params;
  const { resourceIds = [], texts = [], risk, disadvantage, advantage, vote } = req.body;

  console.log( req.body );

  const episode = await Episode.load(episodeId);
  const action = episode.getActionById(actionId);

  //Ensure unique
  const resources = resourceIds
    .filter( filterUnique )
    .map( episode.getResourceById );

  action.setResources(resources);
  action.texts = texts;
  action.risk = risk;
  action.advantage = advantage;
  action.disadvantage = disadvantage

  
  if( vote )  {
    action.vote(); 
    //invalidate all the other actions before this one
    const others = episode.getActionsByRound( action.societyId, action.round ).filter( a => a.id !== action.id );
    others.forEach( action => action.invalidate() );
  }

  episode.save();

  // res.send( ActionPanel({ episode, society}) );
  res.location(action.toURL());
  res.sendStatus(201);
  broadcast("actions");
} catch(err) {
  next(err);
}
});

actions.post("/:episodeId/:actionId/result", async (req, res, next) => {
  try {
  const { episodeId, actionId } = req.params;
  const { result } = req.body;

  const episode = await Episode.load(episodeId);
  const action = episode.getActionById(actionId);

  const newResult = result.map( r => Array.isArray(r) ? parseInt(r.at(-1)) : parseInt(r) );
  
  action.result = newResult;
  episode.save();

  res.sendStatus(201);
  broadcast("societies");
} catch(err) {
  next(err);
}
});




actions.get("/:episodeId/:actionId/:view?", async (req, res, next) => {
  try {
  const { episodeId, actionId, view = "view" } = req.params;

  const episode = await Episode.load(episodeId);
  const action = episode.getActionById(actionId);

  res.render(`actions/${view}`, {action});
} catch(err) {
  next(err);
}
});



export default actions;