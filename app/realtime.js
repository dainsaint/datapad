import { WebSocketServer } from "ws";
import Database from "./database.js";
import Game from "./models/game.js";
import Player from "./models/player.js";
import Society from "./models/society.js";

export default class Realtime {

  database = Database.Instance;
  
  start(port) {

    this.database.update((data) => {
      // console.log(data);
      // data.games.at(0).sessions.at(0).societies.push( new Society("Tig Ol' Biddies") );
    });


    const wss = new WebSocketServer({ port })

    wss.on('connection', (ws, req) => {

      ws.on('error', console.error);
      ws.on('message', (message) => {
        const data = JSON.parse( message.toString() );
        switch( data.action ) {
          case "new-game":
            console.log("make a new game why dont ya");
            this.database.update( ({games}) => games.push( new Game() ))
            break;
        }
      })
      

      ws.send(JSON.stringify( this.database.data ));
    });


    console.log(`Realtime server running at ws://localhost:${port}`);
  }

}