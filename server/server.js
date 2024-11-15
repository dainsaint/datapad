import { WebSocketServer } from "ws";
import Database from "./database.js";
import Game from "./models/game.js";
import Player from "./models/player.js";
import Society from "./models/society.js";

export default class Server {

  database = new Database();
  
  constructor(port) {
    const wss = new WebSocketServer({ port })

    wss.on('connection', (ws, req) => {

      ws.on('error', console.error);
      ws.on('message', (data) => {
        console.log(`received ${data}`);
      })
      
      this.database.update( data => {
        
      });

      ws.send(JSON.stringify( this.database.data ));
    });


    console.log(`Datapad server running at ws://localhost:${port}`);
  }

}