const htmx = window["htmx"];

export default function initSelectables() {
  htmx.onLoad((content) => {
    const selectables = content.querySelectorAll("[data-selectable]");
    console.log("bleh");
    selectables.forEach(selectable => {
      const links = selectable.querySelectorAll("a");
      console.log("each");

      links.forEach( link => {
        link.addEventListener("click", (event) => {
          links.forEach( l => {
            setTimeout( () => l.classList.toggle("active", l == event.target.closest("a")), 150 );
          })
        })
      })
    })
  })
};