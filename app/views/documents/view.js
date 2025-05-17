import { html } from "#core/utils";

export default function DocumentView({ document }) {
  return html`
    ${renderNode( document.content )}
  `
}

function renderNode( child ) {
  if( child.type == "root" )
    return renderChildren(child.children);

  if( child.type == "element")
    return renderElement(child);

  if( child.type == "text" )
    return child.value;

  return ""
}

function renderChildren( children ) {
  return html`${children.map( renderNode )}`;
}

function renderElement( child ) {
  return html`
    <${child.tagName} ${{id: child.properties?.id}}>
      ${ renderChildren(child.children) }
    </${child.tagName}>
  `
}
