import express from "express";
import { body, matchedData, validationResult } from "express-validator";
import Episode from "../../models/episode.js";
import { DateTime, Duration, Interval } from "luxon";

const episodes = express.Router();

/*
- [ ] GET     /episodes
- [x] GET     /episodes/create
- [~] POST    /episodes/create
- [x] GET     /episodes/:episodeId/view?
*/

episodes.get("/episodes/create", (req, res) => {
  res.render(`episodes/create`, { layout: "none" });
});

episodes.post("/episodes",
  
  body("name").notEmpty(), 
  body("date").customSanitizer( (date, meta) => {
    const { time, duration } = meta.req.body;
    const dateObject = DateTime.fromISO(date);
    const start = dateObject.set( DateTime.fromISO(time).toObject() );
    const scheduledTime = Interval.after(start, Duration.fromDurationLike(duration));
    console.log(scheduledTime);

    meta.req.body.scheduledTime = scheduledTime;
    return date;
  }),
  body("scheduledTime"),
  
  (req, res) => {
    const result = validationResult(req);
    if( !result.isEmpty() ) {
      throw new Error( JSON.stringify( result.array(), null, 2 ) )
    }

    // const episode = new Episode(req.body);
    // episode.save();

    // res.redirect( episode.toURL() );
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
    res.render(`episodes/facilitator`, { episode, societyId, layout: "app" });
  }
  
});

episodes.get("/episodes/:episodeId/:view?", (req, res) => {
  const { episodeId, view } = req.params;
  const episode = Episode.load(episodeId);

  if(!view)
    res.redirect(`/episodes/${episodeId}/gm`)
  else
    res.render(`episodes/${view}`, { episode, layout: "app" });
});


function validate(req) {

  const { name, game, date, time, duration } = req.body;

  const start = DateTime.fromISO(date).set( DateTime.fromISO(time).toObject() );
  const durationObject = /(?<hours>[^h])h (?<minutes>[^h])m/g.exec(duration)?.groups;

  const scheduledTime = Interval.after(
    start,
    Duration.fromDurationLike( durationObject )
  );

  console.log(scheduledTime);

  req.body.scheduledTime = scheduledTime;

  throw new Error("validation off");

  // return {
  //   name, game, date: DateTime.fromISO(date), scheduledTime 
  // };
}

export default episodes;