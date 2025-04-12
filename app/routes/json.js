import { secondsToTime } from "#core/utils";
import Ledger from "#database/ledger";
import { ActionTags } from "#models/action";
import Episode from "#models/episode";
import { ResourceTag } from "#models/resource";
import express from "express";


const jsonRouter = express.Router();

jsonRouter.use((req, res, next) => {
  res.type("json");
  next();
})


jsonRouter.get("/episodes/active", (req, res) => {
  let episode = Ledger.getActiveEpisode();

  const formatResource = ({name, tags}) => ({
    name,
    vital: tags.has( ResourceTag.VITAL ),
    exhausted: tags.has( ResourceTag.EXHAUSTED )
  })

  const result = {
    currentPhase: {
      type: episode.currentPhase.type,
      status: episode.currentPhase.status,
      round: episode.currentPhase.round,
      time: {
        elapsed: episode.currentPhase.timeElapsed,
        duration: episode.currentPhase.duration,
        remaining: episode.currentPhase.timeRemaining,
        remainingFormatted: secondsToTime(episode.currentPhase.timeRemaining)
      }
    },
    societies: episode.societies.map( society => ({
      name: society.name,
      communities: society.communities.map( ({ id: communityId, name, voice }) => ({
        name, 
        voice,
        resources: episode.resources.filter( resource => resource.communityId == communityId ).map( formatResource ) 
      })),
      actions: episode.getCurrentActionsForSocietyId( society.id ).map( ({round, text, resourceIds, tags}) => ({
        round,
        text,
        voted: tags.has( ActionTags.COMMITTED ),
        resources: resourceIds.map( id => episode.getResourceById(id) ).map( formatResource ) 
      })),
    }))
  }

  res.send( result );

});



jsonRouter.get("/games", (req, res) => {
  res.send(Ledger.games);
});

jsonRouter.get("/episodes", (req, res) => {
  res.send(Ledger.episodes);
});

jsonRouter.get("/episodes/:episodeId", (req, res) => {
  const { episodeId } = req.params;
  const episode = Episode.load(episodeId)
  res.send(episode);
});

//TODO: These requests should be scoped to either a specific society, or the active society (if one exists)
jsonRouter.get("/communities", (req, res) => {
  const activeEpisode = Ledger.getActiveEpisode();
  const communities = activeEpisode?.communities || [];
  res.send(communities);
});

jsonRouter.get("/players", (req, res) => {
  const activeEpisode = Ledger.getActiveEpisode();
  const players = activeEpisode?.players || [];
  res.send(players);
});

jsonRouter.get("/societies", (req, res) => {
  const activeEpisode = Ledger.getActiveEpisode();
  const societies = activeEpisode?.societies || [];
  res.send(societies);
});

jsonRouter.use((err, req, res, next)=> {
  res.status(err.status || 400).json()
})

export default jsonRouter;