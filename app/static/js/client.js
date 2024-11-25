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

  window.addEventListener("hashchange", updateHashes);
  updateHashes();
}


const updateHashes = () => {
  for( const anchor of document.querySelectorAll("a[href^='#']") ) {
    const isActive = window.location.hash === anchor.getAttribute("href");
    anchor.classList.toggle("active", isActive);
  }
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
