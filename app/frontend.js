import express from "express";

import Database from "./core/database.js";

import Game from "./models/game.js";

import GameCard from "./views/game/GameCard.js";
import GameOverview from "./views/game/GameOverview.js";
import Layout from "./views/layouts/Layout.js";
import SessionOverview from "./views/session/SessionOverview.js";
import GameMaster from "./views/pages/GameMaster.js";
import Home from "./views/pages/Home.js";

export default class Frontend {

  start(port) {
    const app = express();
    const database = Database.Instance;

    app.use( express.static( 'app/static') );

    app.get("/", (req, res) => {
      const layout = new Layout();

      res.send( layout.render( new Home().render( database.data.games ) ) );
    })

    app.post("/game", (req, res) => {
      database.update( ({ games }) => {
        games.push(new Game()); 
      })
    })

    app.get("/game/:id", (req, res) => {
      const layout = new Layout();
      let content = "";

      const game = database.data.games
        .find( g => g._id == req.params.id );

      if( game ) {
        const view = new GameOverview();
        content = view.render( game );
      } 

      res.send( layout.render( content ) );
    });

    app.get("/game/basic/:id", (req, res) => {
      const game = database.data.games.find((g) => g._id == req.params.id);
      let response = "Couldn't find it :(";

      if (game) {
        const view = new GameCard();
        response = view.render(game);
      } 

      res.send( response );
    });


    app.get("/game/:game_id/session/:session_id", (req, res) => {
      const layout = new Layout();
      let content = "";

      const game = database.data.games.find((g) => g._id == req.params.game_id);

      if (!game) 
        return res.send(layout.render(content));

      const session = game.sessions.find( session => session._id == req.params.session_id );

      if( !session )
        return res.send(layout.render(content));

      const view = new SessionOverview();
      content = view.render(session);
      res.send(layout.render(content));
    });

    app.get("/gm", (req, res) => {
      const layout = new Layout();
      let content = "";

      const game = database.data.games.at(0);

      if (!game) return res.send(layout.render(content));

      const session = game.sessions.at(0);

      if (!session) return res.send(layout.render(content));

      const view = new GameMaster();
      content = view.render(session);
      res.send(layout.render(content));
    })



    app.listen(port, error => {
      if(!error)
        console.log( `Frontend server running at https://localhost:${port}` );
    })

  }

}


