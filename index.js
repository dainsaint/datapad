import getPort, { portNumbers } from "get-port";
import Server from "./app/server.js";
import registry from "./app/core/registry.js";

registry.initialize();

const serverPort = await getPort({ port: portNumbers(4000, 4100) });
const server = new Server();

server.start(serverPort);