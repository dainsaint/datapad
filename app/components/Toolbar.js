import Icon from "./Icon.js";

export default function Toolbar() {
  return `
  <nav class="toolbar toolbar-icons color-contrast" hx-boost="true" hx-push-url="true">
    <ul>
      <li><a href="/">${ Icon("spop") }</a></li>
      <li><a href="/gm">${ Icon("dice") }</a></li>
      <li><a href="/facilitator">${ Icon("societal") }</a></li>
      <li><a href="/scripts">${ Icon("script") }</a></li>
    </ul>
  </nav>
  `;
}