import getPort, { portNumbers } from "get-port";
import Server from "./app/app.js";
import registry from "./app/database/registry.js";
import { populateDummyData } from "./app/database/populate.js";

registry.initialize();
// populateDummyData();

const serverPort = process.env.PORT || await getPort({ port: portNumbers(4000, 4100) });
const server = new Server();

server.start(serverPort);