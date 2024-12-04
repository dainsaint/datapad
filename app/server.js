import express from "express";
import htmlRouter, {tick as htmlTick} from "./servers/html.js";
import jsonRouter from "./servers/json.js";
import Timer from "./core/timer.js";

export const request = {
  path: "/",
  params: {}
}

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
};

export default class Server {

  timer;

  constructor() {
    this.timer = new Timer(1000, this.tick);
  }

  start(port) {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.static("app/static"));
    app.use((req, res, next) => {
      request.path = req.path;
      request.params = req.params;
      next();
    });
    app.use("/api/v1", jsonRouter);
    app.use("/", htmlRouter);
    app.use(errorHandler);

    app.listen(port, (error) => {
      if (!error)
        console.log(`Datapad server running at https://localhost:${port}`);
    });

    this.timer.start();
  }

  tick(deltaTime) {
    htmlTick(deltaTime);
  }

}