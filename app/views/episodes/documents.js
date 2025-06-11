import { html } from "#core/utils";
import Document from "#models/document";
import Episode from "#models/episode";
import DocumentView from "#views/documents/view";
import Toolbar from "#views/ui/toolbar";

export default function EpisodeDocuments ({ episode = new Episode(), documentId = undefined} = {} ) {
  const currentDocument = documentId ? episode.getDocumentById(documentId) : episode.documents.at(0);
  // const content = await currentDocument?.getContent();

  // console.log( currentDocument, documentId );
  return html`
    <style>
    #episode-documents {
      display: grid;
      grid-template-columns: minmax(600px, 1fr) minmax(400px, auto);
      
      gap: var(--gap);
      height: 100%;
      overflow: hidden;
    }

    @media (max-width: 1000px) {
      #episode-documents {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 3fr;
      }
    }
    </style>

    <div id="episode-documents" class="layout-row full" style="overflow: hidden" 
      hx-get
      hx-trigger="sse:documents"
      hx-swap="outerHTML"
    >

      <div class="society-panel__communities panel full" style="flex: 1 0 max-content;">
        
      ${ currentDocument && html`
        <div id="documents-toolbar" hx-swap="none" hx-select-oob="#documents-outline, #documents-view">
          ${ Toolbar({
            id: "document-toolbar",
            class: "toolbar-rounded",
            links: episode.documents.map( document => ({
              href: episode.toURL("/documents/" + document.id ),
              content: html`<i class="fa ${document.icon} icon is-size-3 align-center"></i>`,
              isActive: document == currentDocument
            }))
          })}
        </div>

        <div id="documents-outline" class="stack scrollable">
          <h1>${ currentDocument.name }</h1>
          <form class="layout-row gap" hx-post="${currentDocument.toURL("/refresh")}"  hx-disabled-elt="button" hx-swap="none">
            <a class="button" target="_blank" href="http://docs.google.com/document/d/${currentDocument.googleDocId}"><i class="fa fa-pen-to-square"></i> Edit In Google Docs</a>  
            <button><i class="fa fa-refresh"></i> Reload </button>  
            <i class="fa fa-spinner fa-spin htmx-indicator"></i>
          </form>

          <div class="text">
            ${ renderOutline( currentDocument.content ) }
          </div>
        </div>
        `}
      </div>

      <div id="documents-view" class="panel color-contrast full">
        <main class="content stack text scrollable">
          ${ currentDocument && DocumentView({document: currentDocument}) }
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

