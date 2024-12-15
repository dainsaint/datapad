import express from "express";
import Ledger from "../../models/ledger.js";
import App from "../../components/layouts/App.js";
import Home from "../../components/Home.js";

const home = express.Router();

/*
- [ ] GET     /
*/

home.get("/", (req, res, next) => {
  try {
    const games = Ledger.games;
    const sessions = Ledger.sessions;
    //TODO: Design the actual landing page: https://github.com/dainsaint/datapad/issues/39
    res.send(App(Home(games, sessions)));
  } catch (e) {
    res.status(404);
    console.log(e);
    next(e);
  }
});

export default home;