import express from "express";
import Ledger from "#database/ledger";
import Episode from "#models/episode";

const pages = express.Router();

/*
- [x] GET     /
*/

pages.get("/home", (req, res) => {
  const games = Ledger.games;
  const episodes = Ledger.episodes;
  res.render("pages/home", { games, episodes });
});

pages.get("/", (req, res) => {
  let episode = Ledger.getActiveEpisode();
  
  if( !episode ) {
    const lastEpisodeData = Ledger.episodes.at(-1);
   
    episode = Episode.load( lastEpisodeData.id );
    episode.save();

    Ledger.setActiveEpisode(episode);
  }

  res.redirect(`/episodes/${ episode.id }/facilitator`)
});




export default pages;