export default function Layout(content) {
  if( Array.isArray(content) )
    content = content.join("\n");

  return `
  <!DOCTYPE html>
  <html lang="en">

    <head>
      <link rel="stylesheet" href="/css/neusa/neusa.css"/>
      <link rel="stylesheet" href="/css/reset.css"/> 
      <link rel="stylesheet" href="/css/styles.css" />
      <script type="module" src="/js/vendor/htmx.min.js"></script>
      <script type="module" src="/js/client.js"></script>
    </head>

    <body>
      <section id="app" class="app-content">
        ${content}
      </section>
    </body>

  </html>
  `;
}