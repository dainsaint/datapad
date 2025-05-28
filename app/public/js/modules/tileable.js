const htmx = window["htmx"];

export default function initTileables() {
  htmx.onLoad((content) => {
    const tileables = content.querySelectorAll("[data-tileable]");
    console.log( tileables );
    
    tileables.forEach(tileable => {

      const msnry = new Masonry( tileable, {
        itemSelector: tileable.dataset.tileable,
        percentPosition: true
      });

      msnry.layout();

      tileable.addEventListener("sorted", () => {
        console.log("hey now");
        msnry.reloadItems()
      })

    })
  })
};