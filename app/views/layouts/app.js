import { html } from "#core/utils";

export default function AppLayout(props, children) {
  return html`
  <!DOCTYPE html>
  <html lang="en">

    <head>
      <title>Datapad</title>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      
      <link rel="stylesheet" id="polyfill-styles" />
      <link rel="stylesheet" href="/css/styles.css" />

      <link rel="favicon" href="/images/web-icon.svg"/>
      <link rel="manifest" href="/manifest.webmanifest">

      <script async src="https://unpkg.com/pwacompat" crossorigin="anonymous"></script>

      <script src="/js/vendor/htmx.min.js"></script>
      <script src="/js/vendor/htmx.sse.js"></script>
      <script type="module" src="/js/client.js"></script>
    </head>

    <body>
      <section id="app" class="app-content layout-app" hx-ext="sse" sse-connect="/events">
        
        <div class="in-app">
          ${children} 
        </div>
        
        <dialog id="dialog" class="stack" 
          hx-on:htmx:load="this.showModal()" 
          onclick="if(event.target.value === 'cancel') this.close()">
        </dialog>
      </section>
    </body>

  </html>
  `;
}

