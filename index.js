import express from "express";
import Server from "./server/server.js";
import ClientDev from "./dev/client-dev.js";
import getPort, { portNumbers } from "get-port";

const serverPort = await getPort({ port: portNumbers(3000, 3100) });
const server = new Server(serverPort);

const clientPort = await getPort({ port: portNumbers(8080, 8100) });;
const client = new ClientDev(clientPort);