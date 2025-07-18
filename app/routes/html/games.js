// import Ledger from "#database/ledger";
import express from "express";


const games = express.Router();

/*
Games are implicitly created by episodes, so we dont need full CRUD here (right?)
- [ ] GET    /games
- [ ] GET    /games/:game
- [ ] PUT    /games/:game
*/

games.get("/:view?", async (req, res, next) => {
  // const { view = "overview" } = req.params;
  
  // const games = Ledger.games;
  // res.render(`games/${view}`, { games });
});

games.get("/:gameId/:view?", async (req, res, next) => {
  // const { id, view = "overview"} = req.params;
  // const game = Ledger.getGameById(id);
  // res.render(`games/${view}`, { game });
});

export default games;