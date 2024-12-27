import express from "express";
import Ledger from "../../models/ledger.js";
import App from "../../views/layouts/app.js";
import Home from "../../views/pages/home.js";

const home = express.Router();

/*
- [x] GET     /
*/

home.get("/", (req, res, next) => {
  try {
    const games = Ledger.games;
    const episodes = Ledger.episodes;

    //TODO: Design the actual landing page: https://github.com/dainsaint/datapad/issues/39
    res.send(App(Home({ games, episodes })));
  } catch (e) {
    res.status(404);
    console.log(e);
    next(e);
  }
});

export default home;