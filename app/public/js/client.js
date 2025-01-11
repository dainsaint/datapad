import initTabbables from "./modules/tabbable.js";
import initSortables from "./modules/sortable.js";

const init = () => {
  // initTabbables();
  initSortables();
};

document.addEventListener("DOMContentLoaded", init);
