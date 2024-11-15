import getPort, { portNumbers } from "get-port";
import Realtime from "./app/realtime.js";
import Frontend from "./app/frontend.js";


const realtimePort = await getPort({ port: portNumbers(3000, 3100) });
const realtime = new Realtime();

const frontendPort = await getPort({ port: portNumbers(4000, 4100) });
const frontend = new Frontend();

realtime.start(realtimePort);
frontend.start(frontendPort);