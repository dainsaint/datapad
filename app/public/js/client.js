import initPolyfills from "./modules/polyfills.js";
import initSortables from "./modules/sortable.js";
import initScrollables from "./modules/scrollable.js";

const init = () => {
  initPolyfills();
  initSortables();
  initScrollables();

  // htmx.logAll();
};

document.addEventListener("DOMContentLoaded", init);
