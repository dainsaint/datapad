import Episode from "#models/episode";
import Phase, { PhaseStatus, PhaseType } from "#models/phase";
import Record, { RecordType } from "#models/record";
import express from "express";
import { broadcast } from "#routes/html/events";

const phases = express.Router();


phases.get("/:episodeId/create", async (req, res, next) => {
  const { episodeId } = req.params;
  const episode = await Episode.load(episodeId);
  res.render(`phases/create`, { episode });
});


phases.post("/:episodeId", async (req, res, next) => {
  const { episodeId } = req.params;
  const { type, duration: { minutes, seconds }} = req.body;

  const episode = await Episode.load(episodeId);
  
  const update = {
    type,
    duration: parseInt(minutes) * 60 + parseInt(seconds)
  };

  const phase = new Phase(update);
  episode.addPhase( phase );
  episode.save();

  
  res.sendStatus(200);
  broadcast("phases");
})


phases.post("/:episodeId/round", async (req, res, next) => {
  const { episodeId } = req.params;
  const episode = await Episode.load(episodeId);

  episode.addPhase(new Phase({ type: PhaseType.UNIVERSAL, duration: 240 }))
  episode.addPhase(new Phase({ type: PhaseType.SOCIETAL,  duration: 10 * 60 }))
  episode.addPhase(new Phase({ type: PhaseType.GALACTIC,  duration: 3 * 4 * 60 }))
  episode.addPhase(new Phase({ type: PhaseType.INDIVIDUAL,  duration: 10 * 60 }))
  episode.sanitizePhases();
  episode.save();
  
  res.sendStatus(200);
  broadcast("phases");
});




phases.get("/:episodeId/:phaseId/:view?", async (req, res, next) => {
  const { episodeId, phaseId, view = "card" } = req.params;

  console.log( episodeId, phaseId );

  const episode = await Episode.load(episodeId);
  const phase = episode.getPhaseById(phaseId);

  res.render(`phases/${view}`, { phase });
});



phases.post("/:episodeId/:phaseId", async (req, res, next) => {
  const { episodeId, phaseId } = req.params;
  const { action } = req.body;
  
  const episode = await Episode.load(episodeId);
  const phase = episode.getPhaseById(phaseId);

  //TODO: handle this logic better, with the mutability problem
  const prevPhase = episode.phases.at( episode.phases.indexOf(phase) - 1);
  const nextPhase = episode.phases.at( episode.phases.indexOf(phase) + 1);

  let broadcastEvent = "phases";

  switch (action) {
    case "prev":
      prevPhase.status = PhaseStatus.IDLE;
      broadcastEvent = "episode";
      break;
    case "start":
      phase.startPhase();
      if( phase.type == PhaseType.UNIVERSAL ) {
        episode.startRound( phase.round );
      }
      break;
    case "pause":
      phase.pausePhase();
      break;
    case "next":
      phase.completePhase();
      
      if( nextPhase && nextPhase.round > phase.round ) {
        episode.completeRound( phase.round );
      }
      broadcastEvent = "episode";
      break;

    case "add":
      phase.duration += 60;
      break;

    case "subtract":
      phase.duration = Math.max( phase.duration - 60, 0 );
      break;
  }
  
  episode.save();

  res.sendStatus(200);
  broadcast( broadcastEvent );
  
});



phases.put("/:episodeId/:phaseId", async (req, res, next) => {
  const { episodeId, phaseId } = req.params;
  const { type, round, duration: { minutes, seconds }, timeElapsed} = req.body;

  const episode = await Episode.load(episodeId);
  const phase = episode.getPhaseById(phaseId);
  
  const update = {
    type,
    round: parseInt(round),
    duration: parseInt(minutes) * 60 + parseInt(seconds)
  };

  if( timeElapsed !== undefined )
    update.timeElapsed = parseInt(timeElapsed);

  phase.update( update );
  episode.save();


  res.sendStatus(200);
  broadcast("phases");
})


phases.delete("/:episodeId/:phaseId", async (req, res) => {
  const { episodeId, phaseId } = req.params;

  try {
    const episode = await Episode.load(episodeId);
    episode.deletePhaseById( phaseId );
    episode.save();
  
    res.sendStatus(200);
    broadcast("phases");
  } catch (e) {
    res.setHeader("HX-Trigger", "error");
    res.sendStatus(400);
  }
});

export default phases;