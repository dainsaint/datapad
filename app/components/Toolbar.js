import Icon from "./Icon.js";
import { request } from "../server.js";

// using the query here is weird, right?
// but without it, we'll need access to session...
// should probably be SessionToolbar!
export default function Toolbar() {
  const getActiveClass = (href) => {
    if( href != "/" && request.query.view === href )
      return 'active'
    else
      return '';
  }
  return `
  <nav class="toolbar color-contrast" hx-boost="true" hx-push-url="true">
    <ul class="layout-column">
      <li><a id="nav-link-home" class="${ getActiveClass('') }" href="/">${Icon("spop")}</a></li>
      <li><a id="nav-link-gm" class="${ getActiveClass('gm') }" href="?view=gm">${Icon("dice")}</a></li>
      <li><a id="nav-link-facilitator" class="${ getActiveClass('facilitator') }" href="?view=facilitator">${Icon("societal")}</a></li>
      <li><a id="nav-link-script" class="${ getActiveClass('script') }" href="?view=script">${Icon("script")}</a></li>
    </ul>
  </nav>
  `;
}