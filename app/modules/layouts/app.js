export default function AppLayout(content) {
  if( Array.isArray(content) )
    content = content.join("\n");

  return `
  <!DOCTYPE html>
  <html lang="en">

    <head>
      <title>Datapad</title>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="/css/neusa/neusa.css"/>
      <link rel="stylesheet" href="/css/reset.css"/> 
      <link rel="stylesheet" href="/css/styles.css" />
      <script src="/js/vendor/htmx.min.js"></script>
      <script src="/js/vendor/htmx.sse.js"></script>
      <script type="module" src="/js/client.js"></script>
    </head>

    <body>
      <section id="app" class="app-content" hx-ext="sse" sse-connect="/events">
        ${content} 
        
        <dialog id="dialog" class="stack" 
          hx-on:htmx:load="this.showModal()" 
          onclick="if(event.target.value === 'cancel') this.close()">
        </dialog>
      </section>
    </body>

  </html>
  `;
}