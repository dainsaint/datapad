import Icon from "./Icon.js";
import { request } from "../server.js";

export default function Toolbar() {
  const getActiveClass = (href) => request.path == href ? 'active' : '';
  return `
  <nav class="toolbar toolbar-icons color-contrast" hx-boost="true" hx-push-url="true">
    <ul>
      <li><a id="nav-link-home" class="${ getActiveClass('/') }" href="/">${Icon("spop")}</a></li>
      <li><a id="nav-link-gm" class="${ getActiveClass('/gm') }" href="/gm">${Icon("dice")}</a></li>
      <li><a id="nav-link-facilitator" class="${ getActiveClass('/facilitator') }" href="/facilitator">${Icon("societal")}</a></li>
      <li><a id="nav-link-scripts" class="${ getActiveClass('/scripts') }" href="/scripts">${Icon("script")}</a></li>
    </ul>
  </nav>
  `;
}