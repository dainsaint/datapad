import express from "express";
import Ledger from "../../models/ledger.js";
import App from "../../views/layouts/app.js";
import Home from "../../views/pages/home.js";

const pages = express.Router();

/*
- [x] GET     /
*/

pages.get("/", (req, res) => {
  const games = Ledger.games;
  const episodes = Ledger.episodes;

  //TODO: Design the actual landing page: https://github.com/dainsaint/datapad/issues/39
  res.send(App(Home({ games, episodes })));
});

export default pages;