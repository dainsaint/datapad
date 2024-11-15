import { delay } from "./utils.js";

const delayConstants = [10, 100, 1000, 2000, 5000];
const getReconnectionDelay = (attempt) => {
  return delayConstants.at(Math.min(delayConstants.length - 1), attempt);
}

const dataReviver = (key, value) => {
  if (Date.parse(value)) return new Date(value);
  return value;
}

export default class Socket {
  
  server;
  socket;
  onData;

  constructor(server = "ws://localhost:8080") {
    this.server = server;
  }

  async reconnect() {
    for (let i = 0; i < 10; i++) {
      this.connect();
      await delay( getReconnectionDelay(i) );
      if( this.socket.readyState === WebSocket.OPEN )
        break;
    }
  }

  

  connect() {
    this.socket = new WebSocket(this.server);

    this.socket.onerror = (event) => {
      // console.error( event.error )
    }

    this.socket.onopen = (event) => {
      this.sendData({
        event: "connected"
      })
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data, dataReviver);

      if( this.onData ) {
        this.onData(data)
      }
      console.log('data received', data);
    };

    this.socket.onclose = (event) => {
      console.log("socket closed; attempting to reconnect");
      this.reconnect();
    };
  }

  sendData(data) {
    this.socket.send(JSON.stringify(data));
  }


}