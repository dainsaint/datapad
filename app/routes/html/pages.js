import express from "express";
import Ledger from "#database/ledger";
import Episode from "#models/episode";

const pages = express.Router();

/*
- [x] GET     /
*/

pages.get("/home", async (req, res, next) => {
  try {
  const games = Ledger.games;
  const episodes = Ledger.episodes;
  res.render("pages/home", { games, episodes });
} catch(err) {
  next(err);
}
});

pages.get("/", async (req, res, next) => {
  try {
  let episode = await Ledger.getActiveEpisode();
  if( episode ) {
    res.redirect(`/episodes/${ episode.id }/facilitator`)
  } else if( !episode && Ledger.episodes.length) {
    const lastEpisodeData = Ledger.episodes.at(-1);
   
    episode = await Episode.load( lastEpisodeData.id );
    episode.save();

    Ledger.setActiveEpisode(episode);
    res.redirect(`/episodes/${ episode.id }/facilitator`)
  } else {
    res.redirect(`/home`)
  }

} catch(err) {
  next(err);
}
});




export default pages;