import { body, matchedData, validationResult } from "express-validator";
import { broadcast } from "#routes/html/events";
import { DateTime, Duration, Interval } from "luxon";
import { EpisodeTimeInput } from "#views/episodes/create";
import Community from "#models/community";
import Document from "#models/document";
import Episode from "#models/episode";
import express from "express";
import Ledger from "#database/ledger";
import Phase from "#models/phase";
import Society from "#models/society";

const episodes = express.Router();

/*
- [ ] GET     /episodes
- [x] GET     /episodes/create
- [~] POST    /episodes/create
- [x] GET     /episodes/:episodeId/view?
*/


function episodeLayout (req, res, next) {
  res.locals.layout = req.headers["hx-request"] ? "none" : "episode";
  next();
}


episodes.get("/create", async (req, res) => {
  res.render(`episodes/create`);
});

episodes.post("/create/time", async (req, res) => {
  const { date, time, duration } = req.body;

  res.send( EpisodeTimeInput({
    date: DateTime.fromISO(date),
    time: DateTime.fromISO(time),
    duration
  }))
});

episodes.post("/",
  
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
  
  async (req, res) => {
    const result = validationResult(req);
    if( !result.isEmpty() ) {
      throw new Error( JSON.stringify( result.array(), null, 2 ) )
    }

    const data = matchedData(req);
    console.log( data );

    const episode = new Episode(data);
    episode.save();

    broadcast("episode");
})

episodes.put("/:episodeId", async (req, res) => {
  const { episodeId } = req.params;
  const episode = await Episode.load( episodeId );
  console.log( req.body );
  episode.update( req.body );
  episode.save();
  res.sendStatus(200);
  broadcast("episode");
})

////////////////////////////////////////
// INDIVIDUAL ROUTES
////////////////////////////////////////


episodes.post("/:episodeId/active", async (req, res) => {
  const { episodeId } = req.params;
  const episode = await Episode.load( episodeId );
  Ledger.setActiveEpisode( episode );
  res.sendStatus(200);
  broadcast("episode");
})


episodes.get("/:episodeId/facilitator/:societyId?", episodeLayout, async (req, res) => {
  const { episodeId, societyId } = req.params;

  const episode = await Episode.load(episodeId);

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


episodes.get("/:episodeId/documents/:documentId?", episodeLayout, async (req, res) => {
  const { episodeId, documentId } = req.params;
  
  const episode = await Episode.load(episodeId);

  req.session.documents ??= {}  

  if( !documentId && episode.documents.length ) {
    req.session.documents.documentId ??= episode.documents.at(0)?.id;
    res.redirect(
      `/episodes/${episodeId}/documents/${req.session.documents.documentId}`
    );
  } else {
    req.session.documents.documentId = documentId;
    res.render(`episodes/documents`, { episode, documentId });
  }
  
});


episodes.get("/:episodeId/:view?", episodeLayout, async (req, res) => {
  const { episodeId, view } = req.params;

  const episode = await Episode.load(episodeId);

  if(!view)
    res.redirect(`/episodes/${episodeId}/gm`)
  else
    res.render(`episodes/${view}`, { episode });
});




episodes.put("/:episodeId/playlist", async (req, res) => {
  const { episodeId } = req.params;
  const { phaseIds } = req.body;
  
  const inOrder = phaseIds.flat();
  const episode = await Episode.load(episodeId);

  episode.phases.sort( (a, b) => inOrder.indexOf(a.id) - inOrder.indexOf(b.id) );
  episode.save();

  res.sendStatus(200);
  broadcast("episode");
});



episodes.post("/:episodeId/documents", async (req, res) => {
  const { episodeId } = req.params;
  const episode = await Episode.load(episodeId);
  const document = new Document(req.body);

  episode.documentIds.push( document.id );
  episode.save();

  await document.refresh();

  res.sendStatus("200");
  broadcast("documents");
});


episodes.post("/:episodeId/copy", async (req, res) => {
  const { episodeId } = req.params;
  const { originalEpisodeId } = req.body;
  const episode = await Episode.load( episodeId );
  const original = await Episode.load( originalEpisodeId );

  episode.resources = [];
  episode.actions = [];
  episode.turns = []
  episode.records = [];
  
  
  episode.societies = original.societies.map( society => new Society(society) );
  episode.communities = original.communities.map( community => new Community(community) );
  episode.phases = original.phases.map( phases => new Phase(phases) );
  episode.documentIds = original.documentIds.map( id => id );
  episode.links = Object.create( original.links );

  

  episode.save();
  Episode.uncache(episode.id);
  
  res.sendStatus(200);
  broadcast("episode");
})





export default episodes;