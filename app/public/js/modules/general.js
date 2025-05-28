const htmx = window["htmx"];

export default function initGeneral() {
  htmx.onLoad((content) => {
    const cards = content.querySelectorAll(".js-community-card");
    console.log( cards );
    
    cards.forEach( card => {
      const inHomeSociety = card.dataset.societyId == card.closest(".society-view").dataset.societyId;
      card.classList.toggle("community-card--is-home", inHomeSociety);
    })
  })
};