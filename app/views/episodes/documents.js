import { html } from "#core/utils";
import Episode from "#models/episode";
import DocumentView from "#views/documents/view";
import EpisodeLayout from "./components/layout.js";


export default function EpisodeDocuments ({ episode = new Episode()} = {}) {

  const icons = {
    Script: "fa-scroll",
    Rules: "fa-scale-balanced"
  }

  const content = html`
    <div class="grid-two" style="height: 100%">

    <div class="society-panel__communities layout-row panel">
      <nav class="toolbar">
        ${ episode.documents.map( (document, i) => html`
          <a hx-boost="true" class="${i == 0 && 'active'}"">
            <i class="fa ${icons[document.name]} icon is-size-3"></i>
          </a>
        `)}
      </nav>

      <div class="stack scrollable">
        <h1>Outline</h1>
        ${ episode.documents.map( document => html`
          <h2>${ document.name }</h2>
          ${ renderOutline( document.content ) }
        `) }
      </div>
    </div>

    <div class="panel color-contrast">
      <main class="content stack text scrollable">
        ${ episode.documents.map( document => DocumentView({document}) ) }
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

