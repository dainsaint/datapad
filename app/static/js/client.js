const init = () => {
  window.addEventListener("hashchange", updateHashes);
  updateHashes();
}

const updateHashes = () => {
  for( const anchor of document.querySelectorAll("a[href^='#']") ) {
    const isActive = window.location.hash === anchor.getAttribute("href");
    anchor.classList.toggle("active", isActive);
  }
}

document.addEventListener("DOMContentLoaded", init);
