import express from "express";
import { body, matchedData, validationResult } from "express-validator";
import Episode from "./model.js";
import { DateTime, Duration, Interval } from "luxon";
import { EpisodeTimeInput } from "./views/create.js";

const episodes = express.Router();

/*
- [ ] GET     /episodes
- [x] GET     /episodes/create
- [~] POST    /episodes/create
- [x] GET     /episodes/:episodeId/view?
*/

episodes.get("/episodes/create", (req, res) => {
  res.render(`episodes/views/create`, { layout: "none" });
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

episodes.get("/episodes/:episodeId/facilitator/:societyId?", (req, res) => {
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
    res.render(`episodes/views/facilitator`, { episode, societyId, layout: "app" });
  }
  
});

episodes.get("/episodes/:episodeId/:view?", (req, res) => {
  const { episodeId, view } = req.params;
  const episode = Episode.load(episodeId);

  if(!view)
    res.redirect(`/episodes/${episodeId}/gm`)
  else
    res.render(`episodes/views/${view}`, { episode, layout: "app" });
});


export default episodes;