import { WebSocketServer } from "ws";
import Database from "./core/database.js";
import Game from "./models/game.js";

export default class Realtime {

  database
  
  start(port) {
    this.database = Database.open("data.json");
  
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