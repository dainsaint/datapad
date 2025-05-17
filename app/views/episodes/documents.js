import { html } from "#core/utils";
import Document from "#models/document";
import Episode from "#models/episode";
import DocumentView from "#views/documents/view";
import Toolbar from "#views/ui/toolbar";
import EpisodeLayout from "./components/layout.js";

const icons = {
  Script: "fa-scroll",
  Rules: "fa-scale-balanced"
}

export default function EpisodeDocuments ({ episode = new Episode(), documentId = undefined} = {} ) {
  const currentDocument = documentId ? Document.load(documentId) : episode.documents.at(0);


  const content = html`
    <div id="episode-documents" class="layout-row full" style="overflow: hidden">

      <div class="society-panel__communities panel full" style="flex: 1 0 max-content;">
        <div id="documents-toolbar" hx-swap="none">
          ${ Toolbar({
            id: "document-toolbar",
            class: "toolbar-rounded",
            links: episode.documents.map( document => ({
              href: episode.toURL("/documents/" + document.id ),
              content: html`<i class="fa ${icons[document.name]} icon is-size-3"></i>`,
              isActive: document == currentDocument
            }))
          })}
        </div>

        <div id="documents-outline" class="stack scrollable text" hx-swap-oob="true">
          <h1>${ currentDocument.name }</h1>
          ${ renderOutline( currentDocument.content ) }
        </div>
      </div>

      <div id="documents-view" class="panel color-contrast full" hx-swap-oob="true">
        <main class="content stack text scrollable">
          ${ DocumentView({document: currentDocument}) }
        </main>
      </div>

    </div>
  `;

  return EpisodeLayout({episode}, content);
}


function renderOutline(root) {
  const headings = root.children.filter( child => child.properties?.id );
  let result = "<ul>";

  for( let i = 0; i < headings.length; i++ ){
    const heading = headings.at(i);
    const next = headings.at(i+1);

    result += "<li>"
    result += html`<a href="#${heading.properties.id}">${ heading.children.map( child => child.value ) }</a>`
    if( next?.tagName > heading.tagName ) {
      result += "<ul>"
    } else if ( !next || next?.tagName < heading.tagName ) {
      result += "</ul>"
    }
  }

  result += "</ul>";

  return result;
}

