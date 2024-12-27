import express from "express";
import path from "node:path";
import htmlRouter, {tick as htmlTick} from "./servers/html.js";
import jsonRouter from "./servers/json.js";
import Timer from "./core/timer.js";
import { fileURLToPath } from "node:url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const request = {
  path: "/",
  query: {},
  params: {}
}

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
};

export default class Server {

  timer;

  constructor() {
    this.timer = new Timer(this.tick, 1000);
  }

  start(port) {
    const app = express();

    app.engine("js", async(filePath, options, callback) => {
      try {
        const { layout = "app", ...data } = options;
        const Template = await import(filePath);
        const content = Template.default(data);

        if( layout && layout !== "none" ) {
          const layoutPath = path.join( __dirname, `components/layouts/${layout}.js`);
          const Layout = await import(layoutPath);
          const layoutRendered = Layout.default( content );
          callback(null, layoutRendered);
        } else {
          callback(null, content);
        }
      } catch(e) {
        callback(e);
      }
    })

    app.set("views", "app/components");
    app.set("view engine", "js");

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.static("app/static"));
    app.use((req, res, next) => {
      request.path = req.path;
      request.query = req.query;
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