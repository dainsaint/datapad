import { body, matchedData, validationResult } from "express-validator";
import { DateTime, Duration, Interval } from "luxon";
import { EpisodeTimeInput } from "#views/episodes/create";
import Episode from "#models/episode";
import express from "express";
import { broadcast } from "#routes/html/events";

const episodes = express.Router();

/*
- [ ] GET     /episodes
- [x] GET     /episodes/create
- [~] POST    /episodes/create
- [x] GET     /episodes/:episodeId/view?
*/


function episodeLayout(req, res, next) {
  res.locals.layout = req.headers["hx-request"] ? "none" : "episode";
  next();
}


episodes.get("/episodes/create", (req, res) => {
  res.render(`episodes/create`);
});

episodes.post("/episodes/create/time", (req, res) => {
  const { date, time, duration } = req.body;

  res.send( EpisodeTimeInput({
    date: DateTime.fromISO(date),
    time: DateTime.fromISO(time),
    duration
  }))
});

episodes.post("/episodes",
  
  body("name").notEmpty(), 
  body("date").customSanitizer( (date, meta) => {
    const { time, duration } = meta.req.body;
    const { hour, minute } = DateTime.fromISO(time).toObject();
    
    const dateObject = DateTime.fromISO(date);
    const start = dateObject.set( { hour, minute } );
    const scheduledTime = Interval.after(start, Duration.fromDurationLike(duration));

    meta.req.body.scheduledTime = scheduledTime;
    return dateObject;
  }),
  body("scheduledTime"),
  
  (req, res) => {
    const result = validationResult(req);
    if( !result.isEmpty() ) {
      throw new Error( JSON.stringify( result.array(), null, 2 ) )
    }

    const data = matchedData(req);
    // console.log( data );

    const episode = new Episode(data);
    episode.save();

    res.redirect( episode.toURL() );
})

////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////

episodes.get("/episodes/:episodeId/facilitator/:societyId?", episodeLayout, (req, res) => {
  const { episodeId, societyId } = req.params;

  const episode = Episode.load(episodeId);

  req.session.facilitator ??= {}  

  if( !societyId && episode.societies.length ) {
    req.session.facilitator.societyId ??= episode.societies.at(0)?.id;
    res.redirect(
      `/episodes/${episodeId}/facilitator/${req.session.facilitator.societyId}`
    );
  } else {
    req.session.facilitator.societyId = societyId;
    res.render(`episodes/facilitator`, { episode, societyId });
  }
  
});


episodes.get("/episodes/:episodeId/documents/:documentId?", episodeLayout, (req, res) => {
  const { episodeId, documentId } = req.params;
  
  const episode = Episode.load(episodeId);

  req.session.document ??= {}  

  if( !documentId && episode.documents.length ) {
    req.session.document.documentId ??= episode.documents.at(0)?.id;
    res.redirect(
      `/episodes/${episodeId}/documents/${req.session.document.documentId}`
    );
  } else {
    req.session.document.documentId = documentId;
    res.render(`episodes/documents`, { episode, documentId });
  }
  
});


episodes.put("/episodes/:episodeId/playlist", (req, res) => {
  const { episodeId } = req.params;
  const { phaseIds } = req.body;
  
  const inOrder = phaseIds.flat();
  const episode = Episode.load(episodeId);

  episode.phases.sort( (a, b) => inOrder.indexOf(a.id) - inOrder.indexOf(b.id) );
  episode.save();

  res.sendStatus(200);
  broadcast("episode");
});


episodes.get("/episodes/:episodeId/playlist", (req, res) => {
  const { episodeId } = req.params;
  const episode = Episode.load(episodeId);
  res.render(`episodes/playlist`, { episode });
});





episodes.get("/episodes/:episodeId/:view?", episodeLayout, (req, res) => {
  const { episodeId, view } = req.params;

  const episode = Episode.load(episodeId);

  if(!view)
    res.redirect(`/episodes/${episodeId}/gm`)
  else
    res.render(`episodes/${view}`, { episode });
});






export default episodes;