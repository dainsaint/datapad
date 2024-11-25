import LayoutToolbar from "./LayoutToolbar.js";

export default function Script (session) {
  const content = `
    <main class="content stack">
      <h1>Script</h1>
      <p>content TK</p>
    </main>

  `;



  return LayoutToolbar(session, content);
}