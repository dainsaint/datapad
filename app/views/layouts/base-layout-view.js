import View from "../../core/view.js";

export default class BaseLayoutView extends View {
  render(content) {
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <link rel="stylesheet" href="/css/neusa/neusa.css"/>
      <link rel="stylesheet" href="/css/styles.css" />
      <script type="module" src="/js/vendor/htmx.min.js"></script>
      <script type="module" src="/js/client.js"></script>
    </head>

    <body>
      <main id="content">
        ${content}
      </main>
    </body>

    </html>
    `;
  }
}
