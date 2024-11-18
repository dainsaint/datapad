import express from "express";
import htmlRouter from "./servers/html.js";
import jsonRouter from "./servers/json.js";

export default class Server {

  start(port) {
    const app = express();

    app.use(express.static("app/static"));
    app.use("/api/v1", jsonRouter);
    app.use("/", htmlRouter);

    app.listen(port, error => {
      if(!error)
        console.log( `Datapad server running at https://localhost:${port}` );
    })

  }

}


