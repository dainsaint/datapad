import Sortable from "../vendor/sortable.esm.js"
import { parseKVPString } from "../utils.js";

const htmx = window["htmx"];

export default function initSortables() {
  htmx.onLoad((content) => {
    const sortables = content.querySelectorAll("[data-sortable]");

    for (const sortable of sortables) {
      const group = sortable.dataset.sortable || "default";
      const pull = (to, from) => {
        const fromKey = from.el.dataset.sortable;
        const allowString = to.el.dataset.sortableAllow || fromKey;
        const allows = parseKVPString(allowString);

        return allows[fromKey];
      };

      const put = (to, from) => {        
        const limit = to.el.dataset.sortableLimit
          ? parseInt(to.el.dataset.sortableLimit)
          : Infinity;

          
        if (to.el.children.length >= limit) return false;
        
        const allowString = to.el.dataset.sortableAllow || to.el.dataset.sortable;
        const allows = parseKVPString(allowString)
        const allowed = Object.keys(allows);

        return allowed.length ? allowed.includes(from.el.dataset.sortable) : true;
      };

      new Sortable(sortable, {
        group: { group, pull, put },
        filter: "[data-sortable-pinned]",
        animation: 150,
        chosenClass: "is-sortable-chosen",
        ghostClass: "is-sortable-ghost",
        dragClass: "is-sortable-drag",
        forceFallback: true,
        onStart: () => {
          document.body.classList.add("is-sorting");
        },
        onEnd: () => {
          document.body.classList.remove("is-sorting");
        },
      });

      sortable.addEventListener("end", (evt) => {
        evt.from.dispatchEvent(new CustomEvent("sorted", { bubbles: true }));
        evt.to.dispatchEvent(new CustomEvent("sorted", { bubbles: true }));
      });
    }
  });
}