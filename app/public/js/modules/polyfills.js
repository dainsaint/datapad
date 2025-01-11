import dialogPolyfill from "../vendor/dialog-polyfill.esm.js";

const htmx = window["htmx"];

function dialogIsSupported() {
  return !!(window.HTMLDialogElement);
}

export default function initPolyfills() {
  const polyfillDialogs = !dialogIsSupported();
  const requiresPolyfillStyles = polyfillDialogs;

  htmx.onLoad(content => {
    if( polyfillDialogs ) {
      const dialogs = content.getElementsByTagName("dialog");
      
      for( const dialog of dialogs ) {
        dialogPolyfill.registerDialog(dialog);
      }
    }

    if (requiresPolyfillStyles) {
      document.getElementById("polyfill-styles")?.setAttribute("href", "/css/polyfills.css");
    }
  });

}