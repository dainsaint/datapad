import { WebSocketServer } from "ws";
import Database from "./core/database.js";
import Game from "./models/game.js";
import Player from "./models/player.js";
import Society from "./models/society.js";
import Session from "./models/session.js";
import Community from "./models/community.js";
import Resource from "./models/resource.js";
import Round from "./models/round.js";
import Phase from "./models/phase.js";

export default class Realtime {

  database = Database.Instance;
  
  
  start(port) {

    this.database.update((data) => {
    //   // console.log(data);
      // data.games
      //   .at(0)
      //   .sessions.at(0)
      //   .phases.push(
      //     new Phase("Worldbuilding Phase", 0, 1200),
      //     new Phase("Universal Phase", 0, 240),
      //     new Phase("Societal Phase", 0, 600),
      //     new Phase("Galactic Phase", 0, 600),
      //     new Phase("Individual Phase", 0, 500),
      //     new Phase("Universal Phase", 1, 240),
      //     new Phase("Societal Phase", 1, 600),
      //     new Phase("Galactic Phase", 1, 600),
      //     new Phase("Individual Phase", 1, 500),
      //     new Phase("Universal Phase", 2, 240),
      //     new Phase("Societal Phase", 2, 600),
      //     new Phase("Galactic Phase", 2, 600),
      //     new Phase("Individual Phase", 2, 500),
      //     new Phase("Universal Phase", 3, 240),
      //     new Phase("Societal Phase", 3, 600),
      //     new Phase("Galactic Phase", 3, 600),
      //     new Phase("Generational Phase", 3, 500),
      //     new Phase("Conclusion Phase", 3, 500)
      //   );
      //     .rounds.push( new Round(), new Round(), new Round() )
      //   .societies.at(0)
      //     .communities.at(0)
      //       .resources.push( new Resource("Green Sludge"), new Resource("Amazing Suspenders"), new Resource("Rock") )
      
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