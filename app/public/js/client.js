import initPolyfills from "./modules/polyfills.js";
import initSortables from "./modules/sortable.js";
import initScrollables from "./modules/scrollable.js";
import initPlaylists from "./modules/playlist.js";

const init = () => {
  initPolyfills();
  initSortables();
  initScrollables();
  // initPlaylists();

  // htmx.logAll();
};

document.addEventListener("DOMContentLoaded", init);
