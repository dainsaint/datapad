import express from "express";

import App from "../../components/App.js";
import GameCard from "../../components/GameCard.js";
import GameOverview from "../../components/GameOverview.js";
import Home from "../../components/Home.js";
import Ledger from "../../models/ledger.js";

const games = express.Router();

/*
Games are implicitly created by sessions, so we dont need full CRUD here (right?)
- [ ] GET    /games
- [ ] GET    /games/:game
- [ ] PUT    /games/:game
*/

games.get("/games/:view?", (req, res, next) => {
  const { view = "home" } = req.params;

  const Views = {
    home: games => App(Home(games))
  }

  const games = Ledger.games;

  const View = Views[view];

  if(!View) {
    next();
    return;
  }

  res.status(200).send( View(games) );
});

games.get("/games/:id/:view?", (req, res, next) => {
  try {
    const { id, view = "overview" } = req.params;
    const game = Ledger.getGameById(id);

    const Views = {
      overview: (game) => App(GameOverview(game)),
      card: GameCard,
    };

    const View = Views[view];

    res.send(View(game));
  } catch (e) {
    next(e);
  }
});

export default games;