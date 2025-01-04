import Ledger from "#database/ledger";
import express from "express";


const games = express.Router();

/*
Games are implicitly created by episodes, so we dont need full CRUD here (right?)
- [ ] GET    /games
- [ ] GET    /games/:game
- [ ] PUT    /games/:game
*/

games.get("/games/:view?", (req, res, next) => {
  const { view = "overview" } = req.params;
  
  const games = Ledger.games;
  res.render(`games/views/${view}`, { games });
});

games.get("/games/:id/:view?", (req, res, next) => {
  const { id, view = "overview"} = req.params;
  const game = Ledger.getGameById(id);
  res.render(`games/views/${view}`, { game });
});

export default games;