import express from "express";
import Ledger from "../../models/ledger.js";

const games = express.Router();

/*
Games are implicitly created by sessions, so we dont need full CRUD here (right?)
- [ ] GET    /games
- [ ] GET    /games/:game
- [ ] PUT    /games/:game
*/

games.get("/games", (req, res, next) => {
  const { view = "overview", layout = "none" } = req.query;
  
  const games = Ledger.games;
  res.render(`games/${view}`, {games, layout});
});

games.get("/games/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const { view = "overview", layout = "none" } = req.query;

    const game = Ledger.getGameById(id);
    res.render(`games/${view}`, { game, layout });
  } catch (e) {
    next(e);
  }
});

export default games;