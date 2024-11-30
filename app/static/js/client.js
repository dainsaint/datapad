import initTabbables from "./modules/tabbable.js";
import initDraggables from "./modules/draggable.js";

const init = () => {
  // initTabbables();
  initDraggables();
};

document.addEventListener("DOMContentLoaded", init);
