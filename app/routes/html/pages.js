import express from "express";
import Ledger from "#database/ledger";

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
  const episode = Ledger.getActiveEpisode();
  res.redirect(`/episodes/${ episode.id }/gm`)
});



export default pages;