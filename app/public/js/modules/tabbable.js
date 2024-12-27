export default function initTabbables() {
  //If we load a tab-driven page, make sure a tab is selected
  
  //Monkey-patch history
  const { pushState, replaceState } = history;

  history.pushState = (...args) => {
    pushState.apply(history, args);
    window.dispatchEvent(new Event("locationchange"));
  }

  history.replaceState = (...args) => {
    replaceState.apply(history, args);
    window.dispatchEvent(new Event("locationchange"));
  };

  const updateLocation = () => {
    const tabbables = document.querySelectorAll("a[href^='#']");
    const pathname = window.location.pathname;

    if( !tabbables.length ) 
      return;

    console.log("updating location for", pathname, localStorage.getItem(pathname));

    if(!window.location.hash) {
      if(!localStorage.getItem(pathname))
        localStorage.setItem(pathname, tabbables[0].getAttribute("href"));

      window.location.hash = localStorage.getItem(pathname);
    }
  }

  // Save the current tab, even when we leave this page
  const updateHashes = () => {
    const tabbables = document.querySelectorAll("a[href^='#']");
    const pathname = window.location.pathname;

    for (const tabbable of tabbables) {
      const isActive = window.location.hash === tabbable.getAttribute("href");
      tabbable.classList.toggle("active", isActive);

      if( isActive )
        localStorage.setItem(pathname, tabbable.getAttribute("href"));
    }
  };

  window.addEventListener("hashchange", updateHashes);
  window.addEventListener("locationchange", updateLocation);

  updateLocation();
  updateHashes();
};