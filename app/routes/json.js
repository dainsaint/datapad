import { secondsToTime } from "#core/utils";
import Ledger from "#database/ledger";
import { ActionStatus, ActionTags } from "#models/action";
import Episode from "#models/episode";
import { ResourceTag } from "#models/resource";
import express from "express";


const jsonRouter = express.Router();

jsonRouter.use(async (req, res, next) => {
  res.type("json");
  next();
})


jsonRouter.get("/episodes/active", async (req, res) => {
  let episode = Ledger.getActiveEpisode();

  const formatResource = ({name,id, tags}) => ({
    id,
    name,
    exhausted: tags.has( ResourceTag.EXHAUSTED )
  })

  const result = {
    currentPhase: {
      type: episode.currentPhase.type,
      id: episode.currentPhase.id,
      status: episode.currentPhase.status,
      round: episode.currentPhase.round,
      time: {
        elapsed: episode.currentPhase.timeElapsed,
        duration: episode.currentPhase.duration,
        remaining: episode.currentPhase.timeRemaining,
        remainingFormatted: secondsToTime(episode.currentPhase.timeRemaining)
      }
    },
    phases: [episode.phases],
    societies: episode.societies.map( society => ({
      name: society.name,
      id: society.id,
      archetype: society.archetype,
      communities: society.communities.map( ({ id: communityId, name, voice }) => ({
        name, 
        voice,
        id: communityId,
        resources: episode.resources.filter( resource => resource.communityId == communityId ).map( formatResource ) 
      })),
      actions: episode.getCurrentActionsForSocietyId( society.id ).map( ({round, status, resourceIds, texts, voteTime }) => ({
        round,
        components: resourceIds.map( (resourceId, i) => ({ 
          resource: {
            id: resourceId,
            name: episode.getResourceById(resourceId).name 
          },
          text: texts[i], 
          statement: `We use ${ episode.getResourceById(resourceId).name } to ${ texts[i] }`
        })),
        voted: status == ActionStatus.VOTED,
        voteTime: voteTime

      })),
    }))
  }

  res.send( result );

});

jsonRouter.get("/episodes/active/playlist", async (req, res) => {
  let episode = Ledger.getActiveEpisode();


  const result = {
    'phases': [episode.phases]
  }

  res.send( result );

});



jsonRouter.get("/games", async (req, res) => {
  res.send(Ledger.games);
});

jsonRouter.get("/episodes", async (req, res) => {
  res.send(Ledger.episodes);
});

jsonRouter.get("/episodes/:episodeId", async (req, res) => {
  const { episodeId } = req.params;
  const episode = await Episode.load(episodeId)
  res.send(episode);
});

//TODO: These requests should be scoped to either a specific society, or the active society (if one exists)
jsonRouter.get("/communities", async (req, res) => {
  const activeEpisode = Ledger.getActiveEpisode();
  const communities = activeEpisode?.communities || [];
  res.send(communities);
});

jsonRouter.get("/players", async (req, res) => {
  const activeEpisode = Ledger.getActiveEpisode();
  const players = activeEpisode?.players || [];
  res.send(players);
});

jsonRouter.get("/societies", async (req, res) => {
  const activeEpisode = Ledger.getActiveEpisode();
  const societies = activeEpisode?.societies || [];
  res.send(societies);
});

jsonRouter.use((err, req, res, next)=> {
  res.status(err.status || 400).json()
})

export default jsonRouter;
