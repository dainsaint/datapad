import express from "express";

import Database from "./core/database.js";

import Game from "./models/game.js";

import GameCard from "./components/game/GameCard.js";
import GameOverview from "./components/game/GameOverview.js";
import Layout from "./components/layouts/Layout.js";
import SessionOverview from "./components/session/SessionOverview.js";
import GameMaster from "./components/pages/GameMaster.js";
import Home from "./components/pages/Home.js";

export default class Frontend {

  start(port) {
    const app = express();
    const database = Database.Instance;

    app.use( express.static( 'app/static') );

    app.get("/", (req, res) => {
      res.send( Layout( Home( database.data.games ) ) );
    })

    app.post("/game", (req, res) => {
      database.update( ({ games }) => {
        games.push(new Game()); 
      })
    })

    app.get("/game/:id", (req, res) => {
      let content = "";

      const game = database.data.games
        .find( g => g._id == req.params.id );

      if( game ) {
        content = GameOverview( game );
      } 

      res.send( Layout( content ) );
    });

    app.get("/game/basic/:id", (req, res) => {
      const game = database.data.games.find((g) => g._id == req.params.id);
      let response = "Couldn't find it :(";

      if (game) {
        response = GameCard(game);
      } 

      res.send( response );
    });


    app.get("/game/:game_id/session/:session_id", (req, res) => {

      let content = "";

      const game = database.data.games.find((g) => g._id == req.params.game_id);

      if (!game) 
        return res.send(Layout(content));

      const session = game.sessions.find( session => session._id == req.params.session_id );

      if( !session )
        return res.send(Layout(content));

      res.send(Layout( SessionOverview() ));
    });

    app.get("/gm", (req, res) => {
      let content = "";

      const game = database.data.games.at(0);

      if (!game) return res.send( Layout(content) );

      const session = game.sessions.at(0);

      if (!session) return res.send( Layout(content) );

      res.send( Layout( GameMaster(session) ) );
    })



    app.listen(port, error => {
      if(!error)
        console.log( `Frontend server running at https://localhost:${port}` );
    })

  }

}


