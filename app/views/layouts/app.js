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
      <link rel="stylesheet" href="/css/fonts/fontawesome/css/fontawesome.min.css" />
      <link rel="stylesheet" href="/css/fonts/fontawesome/css/solid.min.css" />
      <link rel="stylesheet" href="/css/fonts/fontawesome/css/regular.min.css" />
      <link rel="stylesheet" href="/css/fonts/fontawesome/css/brands.min.css" />

      <link rel="favicon" href="/images/web-icon.svg"/>
      <link rel="manifest" href="/manifest.webmanifest">

      <!-- <script async src="https://unpkg.com/pwacompat" crossorigin="anonymous"></script> -->

      <script src="/js/vendor/htmx.min.js"></script>
      <script src="/js/vendor/htmx.sse.js"></script>
      <script type="module" src="/js/client.js"></script>
    </head>

    <body hx-ext="sse" sse-connect="/events">
      <section id="app" class="layout-app" >

        <div class="in-app">
          ${children} 
        </div>
        
        <dialog id="dialog" class="stack in-dialog" 
          hx-on:htmx:load="this.showModal()" 
          hx-on:htmx:after-request="this.close()"
          onclick="if(event.target.value === 'cancel') this.close()">
        </dialog>
      </section>
    </body>

  </html>
  `;
}

