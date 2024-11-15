import express from "express";
import Database from "./database.js";
import GameBasicView from "./views/game/game-basic-view.js";
import BaseLayoutView from "./views/layouts/base-layout-view.js";
import GameFullView from "./views/game/game-full-view.js";
import Player from "./models/player.js";

export default class Frontend {

  start(port) {
    const app = express();
    const database = Database.Instance;

    app.use( express.static( 'app/static') );

    app.get("/", (req, res) => {
      const view = new GameBasicView();
      const response = database.data.games
        .map( view.render )
        .join( "<br/>");

      this.sendPageResponse( response, res );
    })

    app.get("/game/:id", (req, res) => {
      const game = database.data.games
        .find( g => g._id == req.params.id );

      if( game ) {
        const view = new GameFullView();
        const response = view.render( game );
        this.sendPageResponse( response, res );
      } else {
        console.log("how?", req.params.id );
        this.sendPageResponse( "whoops", res);
      }
    });

    app.get("/game/basic/:id", (req, res) => {
      const game = database.data.games.find((g) => g._id == req.params.id);
      let response = "Couldn't find it :(";

      if (game) {
        const view = new GameBasicView();
        response = view.render(game);
      } 

      res.set("Content-Type", "text/html");
      res.send(Buffer.from(response));
    });

    app.listen(port, error => {
      if(!error)
        console.log( `Frontend server running at https://localhost:${port}` );
    })

  }

  sendPageResponse( content, res ) {
    const base = new BaseLayoutView();
    const page = base.render( content );
    res.set("Content-Type", "text/html");
    res.send(Buffer.from(page));
  }
}


