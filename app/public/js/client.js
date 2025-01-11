import initPolyfills from "./modules/polyfills.js";
import initSortables from "./modules/sortable.js";

const init = () => {
  initPolyfills();
  initSortables();
};

document.addEventListener("DOMContentLoaded", init);
