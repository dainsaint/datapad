import express from "express";
import Episode from "../../models/episode.js";

const episodes = express.Router();

/*
- [ ] GET     /episodes/create;
- [ ] GET     /episodes/:episode/gm;
- [ ] GET     /episodes/:episode/facilitator;
- [ ] GET     /episodes/:episode/showrunner;
- [ ] GET     /episodes/:episode/script;
*/

episodes.get("/episodes", (req, res) => {
  try {
    const { view = "create" } = req.query;

    res.render(`episodes/${view}`, { layout: "none" });
  } catch (e) {
    res.status(404).send(e.toString());
  }
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


episodes.get("/episodes/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { view = "gm" } = req.query;
    const episode = Episode.load(id);

    res.render(`episodes/${view}`, { episode, layout: "app" });
  } catch (e) {
    res.status(404).send(e.toString());
  }
});

export default episodes;