const htmx = window["htmx"];

export default function initSelectables() {
  htmx.onLoad((content) => {
    const selectables = content.querySelectorAll("[data-selectable]");
    
    selectables.forEach(selectable => {
      const links = selectable.querySelectorAll("a");

      links.forEach( link => {
        link.addEventListener("click", (event) => {
          links.forEach( l => {
            l.classList.toggle("is-active", l == event.target.closest("a"))
          })
        })
      })
    })
  })
};