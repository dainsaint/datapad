import initPolyfills from "./modules/polyfills.js";
import initSortables from "./modules/sortable.js";
import initScrollables from "./modules/scrollable.js";
import initSelectables from "./modules/selectable.js";
import initGeneral from "./modules/general.js";

const init = () => {
  htmx.config.allowNestedOobSwaps = false;

  initPolyfills();
  initSortables();
  initScrollables();
  initSelectables();
  initGeneral();


  // htmx.logAll();
};

document.addEventListener("DOMContentLoaded", init);
