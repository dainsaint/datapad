import express from "express";
import Ledger from "#database/ledger";
import Episode from "#models/episode";

const pages = express.Router();

/*
- [x] GET     /
*/

// pages.get("/", (req, res) => {
//   const games = Ledger.games;
//   const episodes = Ledger.episodes;
//   res.render("pages/home", { games, episodes, layout: "app" });
// });

pages.get("/", (req, res) => {
  let episode = Ledger.getActiveEpisode();
  
  if( !episode ) {
    const lastEpisodeData = Ledger.episodes.at(-1);  
   
    episode = Episode.load( lastEpisodeData.id );
    episode.makeActive();
    episode.save();

    console.log( Ledger.active );
  }

  res.redirect(`/episodes/${ episode.id }/gm`)
});




export default pages;