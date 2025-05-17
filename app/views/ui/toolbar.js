import { html } from "#core/utils";

export default function Toolbar ({ id, class: classes, links } = {}) {
  return html`
    <nav id="${id}" class="toolbar ${classes}" hx-boost="true" data-selectable>
      ${ links.map( ({ href, push, content, isActive, class: classes }) => html`
        <a class="toolbar-link ${classes} ${{"is-active": isActive}}" ${{ href, "hx-push-url": push }}>
          <span class="toolbar-link__bkg"></span>
          ${ content }
        </a>
      `)}
    </nav>
  `;
}