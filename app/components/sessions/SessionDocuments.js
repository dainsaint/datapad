import SessionLayout from "./SessionLayout.js";

export default function SessionDocuments (session) {
  const content = `
    <nav class="toolbar">
      <ul>
        <li><a href="#script">Script</a></li>
        <li><a href="#rules">Rules</a></li>
        <li><a href="#lore">Lore</a></li>
      </ul>
    </nav>

    <main class="content stack">
      <h1>DOCS</h1>
      <p>Everything here is powered by google docs/archieml</p>
      <p>These will probably be powered by a database entry w key/pair vals</p>
      <ul>
        <li>Script goes here</li>
        <li>Lore keeping goes here</li>
        <li>Rules go here</li>
      </ul>
    </main>

  `;

  return SessionLayout(session, content);
}