import getPort, { portNumbers } from "get-port";
// import Realtime from "./app/realtime.js";
import Server from "./app/server.js";


// const realtimePort = await getPort({ port: portNumbers(3000, 3100) });
// const realtime = new Realtime();

const serverPort = await getPort({ port: portNumbers(4000, 4100) });
const server = new Server();

// realtime.start(realtimePort);
server.start(serverPort);