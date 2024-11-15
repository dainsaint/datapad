import Socket from "./src/socket.js";

let socket;

const init = () => {
  socket = new Socket("ws://localhost:3000");
  socket.onData = onData;
  socket.connect();
}

const onData = (data) => {
  
}


document.addEventListener("DOMContentLoaded", init);
