import express from "express";
import Episode from "../../models/episode.js";

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

episodes.post("/episodes", (req, res) => {
  try {
    const episode = new Episode(req.body);
    //todo: validation
    episode.save();

    res.redirect( episode.toURL() );
  } catch (e) {
    res.status(404).send(e.toString());
  }
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

export default episodes;