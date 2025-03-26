import Episode from "#models/episode";
import Phase, { PhaseStatus, PhaseType } from "#models/phase";
import Record, { RecordType } from "#models/record";
import express from "express";
import { broadcast } from "#routes/html/events";


const phases = express.Router();

/*
- [ ] GET     /episodes/:episode/phases;
- [ ] POST    /episodes/:episode/phases;
- [x] GET     /episodes/:episode/phases/:phase;
- [x] PUT     /episodes/:episode/phases/:phase;
- [ ] DELETE  /episodes/:episode/phases/:phase;
*/

phases.get("/episodes/:episodeId/phases/:phaseId/:view?", (req, res, next) => {
  const { episodeId, phaseId, view = "card" } = req.params;

  const episode = Episode.load(episodeId);
  const phase = episode.getPhaseById(phaseId);

  res.render(`phases/${view}`, { phase, layout: "none" });
});

phases.put("/episodes/:episodeId/phases/:phaseId", (req, res, next) => {
  const { episodeId, phaseId } = req.params;
  const { action } = req.body;
  
  const episode = Episode.load(episodeId);
  const phase = episode.getPhaseById(phaseId);

  //TODO: handle this logic better, with the mutability problem
  const prevPhase = episode.phases.at( episode.phases.indexOf(phase) - 1);
  const nextPhase = episode.phases.at( episode.phases.indexOf(phase) + 1);

  switch (action) {
    case "prev":
      prevPhase.status = PhaseStatus.IDLE;
      break;
    case "start":
      phase.startPhase();
      break;
    case "pause":
      phase.pausePhase();
      break;
    case "next":
      phase.completePhase();
      episode.addRecord(new Record({ type: RecordType.PHASE_ENDED, description: `Round ${phase.round}: ${phase.type}`, value: phase.duration }));
      if( nextPhase && nextPhase.round > phase.round ) {
        completeRound( episode, phase )
      }
      
      break;
    case "split":
      const newGalacticPhase = new Phase({
        type: PhaseType.GALACTIC,
        round: phase.round,
        duration: 180
      })
      episode.splitPhase(phase, newGalacticPhase);
      episode.addRecord(new Record({ type: RecordType.EPISODE_CRISIS_MODE_BEGAN, description: `Round ${phase.round}`, value: true }));
      // console.log( Phase.splitPhase(phase) );
      break;
  }
  //TODO: remove active doofer
  episode.makeActive();
  episode.save();

  //this is the way to "refresh" whatever page
  //this was called from using ajax
  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);
  
  res.sendStatus(200);

});

phases.post("/episodes/:episodeId/phases/:phaseId", (req, res, next) => {
  const { episodeId, phaseId } = req.params;
  const { type, round, duration: { minutes, seconds }} = req.body;

  const episode = Episode.load(episodeId);
  const phase = episode.getPhaseById(phaseId);
  
  const update = {
    type,
    round: parseInt(round),
    duration: parseInt(minutes) * 60 + parseInt(seconds)
  };

  phase.update( update );
  episode.save();

  //this is the way to "refresh" whatever page
  //this was called from using ajax
  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);
  
  res.sendStatus(200);
})


function completeRound( episode ) {
  console.log("HANDLE ROUND COMPLETE")

  episode.societies.forEach( society => {
    episode.addRecord( new Record({ type: RecordType.SOCIETY_RESOURCES, description: society.name, value: society.resources.length }));
    episode.addRecord( new Record({ type: RecordType.SOCIETY_ACTIONS_TAKEN, description: society.name, value: society.resources.length }));
  })

  episode.addRecord( new Record({ type: RecordType.EPISODE_COMMUNITIES_ENDANGERED, value: episode.communities.filter( community => community.isEndangered ).length }))

  episode.turnoverRound();

  episode.save();

  broadcast("societies");
}



export default phases;