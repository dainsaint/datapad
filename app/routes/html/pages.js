import express from "express";
import Ledger from "#database/ledger";

const pages = express.Router();

/*
- [x] GET     /
*/

pages.get("/", (req, res) => {
  const games = Ledger.games;
  const episodes = Ledger.episodes;
  res.render("pages/home", { games, episodes, layout: "app" });
});

export default pages;