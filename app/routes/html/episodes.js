import express from "express";
import Episode from "../../models/episode.js";

const episodes = express.Router();

/*
- [ ] GET     /episodes
- [x] GET     /episodes/create
- [~] POST    /episodes/create
- [x] GET     /episodes/:id/view?
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

episodes.get("/episodes/:id/:view?", (req, res) => {
  const { id, view } = req.params;
  const episode = Episode.load(id);

  if(!view)
    res.redirect(`/episodes/${id}/gm`)
  else
    res.render(`episodes/${view}`, { episode, layout: "app" });
});

export default episodes;