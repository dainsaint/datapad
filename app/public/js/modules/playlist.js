const htmx = window["htmx"];


const saveStates = (states) => {
  console.log( ">>", states );
  localStorage.setItem("playlist-states", JSON.stringify(states) )
}

const loadStates  = () => {
  return JSON.parse( localStorage.getItem("playlist-states") || "{}" );
}


export default function initPlaylists() {
  htmx.onLoad((content) => {
    const playlistDetails = content.querySelectorAll(".phase-playlist details");
    const states = loadStates();

    for( const details of playlistDetails ) {
      details.open = states[details.id] ? "open" : "";

      details.addEventListener("toggle", () => {
        states[details.id] = details.open;
        saveStates(states);
      })
    }

  });
}