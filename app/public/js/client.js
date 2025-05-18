import initPolyfills from "./modules/polyfills.js";
import initSortables from "./modules/sortable.js";
import initScrollables from "./modules/scrollable.js";
import initSelectables from "./modules/selectable.js";

const init = () => {
  htmx.config.allowNestedOobSwaps = false;

  initPolyfills();
  initSortables();
  initScrollables();
  initSelectables();

  // htmx.logAll();
};

document.addEventListener("DOMContentLoaded", init);
