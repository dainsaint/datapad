import { html } from "#core/utils";
import Document from "#models/document";
import Episode from "#models/episode";
import DocumentView from "#views/documents/view";
import Toolbar from "#views/ui/toolbar";

const icons = {
  Script: "fa-scroll",
  Rules: "fa-scale-balanced"
}

export default function EpisodeDocuments ({ episode = new Episode(), documentId = undefined} = {} ) {
  const currentDocument = documentId ? Document.load(documentId) : episode.documents.at(0);

  return html`
    <div id="episode-documents" class="layout-row full" style="overflow: hidden">

      <div class="society-panel__communities panel full" style="flex: 1 0 max-content;">
        <div id="documents-toolbar" hx-swap="none" hx-select-oob="#documents-outline, #documents-view">
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

        <div id="documents-outline" class="stack scrollable">
          <h1>${ currentDocument.name }</h1>
          <div class="layout-row gap">
            <button><i class="fa fa-refresh"></i> Reload </button>  
            <div class="layout-fill"></div>
            <a class="button" target="_blank" href="http://docs.google.com/document/d/${currentDocument.googleDocId}"><i class="fa fa-pen-to-square"></i> Edit In Google Docs</a>
          </div>

          <div class="text">
            ${ renderOutline( currentDocument.content ) }
          </div>
        </div>
      </div>

      <div id="documents-view" class="panel color-contrast full">
        <main class="content stack text scrollable">
          ${ DocumentView({document: currentDocument}) }
        </main>
      </div>

    </div>
  `;

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

