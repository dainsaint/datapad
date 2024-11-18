import Socket from "./socket.js";

let socket;

const init = () => {
  // socket = new Socket("ws://localhost:3000");
  // socket.onData = onData;
  // socket.connect();

  const button = document.querySelector("#send");
  button?.addEventListener("click", () => {
    socket.sendData({
      action: "new-game"
    })
  })
}



const onData = (data) => {
  data.games.forEach( game => {
    const toRender = `
      <li data-id="${game._id}">
        ${ game.date.toDateString() } [${game.sessions.length} session(s)]
      </li>
    `;
    
    document.querySelector("#games")?.append( toRender );
  })
}


document.addEventListener("DOMContentLoaded", init);
