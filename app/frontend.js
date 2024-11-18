import express from "express";

import Database from "./core/database.js";

import Game from "./models/game.js";

import GameCard from "./components/GameCard.js";
import GameOverview from "./components/GameOverview.js";
import Layout from "./components/Layout.js";
import SessionOverview from "./components/SessionOverview.js";
import GameMaster from "./components/GameMaster.js";
import Home from "./components/Home.js";

import { populateDummyData } from "./populate.js";


export default class Frontend {

  start(port) {
    const app = express();
    const database = Database.open("data.json");

    populateDummyData();

    app.use( express.static( 'app/static') );

    app.get("/", (req, res) => {

      const game = database.data.games.at(0);
      const currentSession = database.data.sessions[ game._id ].at(0);

      if (!currentSession) return res.send(Layout(""));

      res.send( Layout( Home( database.data.games, currentSession ) ) );
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

      const session = database.data.sessions[game._id].at(0);

      if (!session) return res.send( Layout(content) );

      res.send( Layout( GameMaster(session) ) );
    })



    app.listen(port, error => {
      if(!error)
        console.log( `Frontend server running at https://localhost:${port}` );
    })

  }

}


