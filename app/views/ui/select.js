import { html } from "#core/utils"

export default function Select({ name, current, options }) {
  return html`
    <select name="${name}">
      ${ options.map( option => `<option value=${option.id} ${ option.id == current ? "selected" : "" }>${option.name}</option>` ) }
    </select>
  `
}