import { map } from "#core/utils"

export default function Select({ name, current, options }) {
  return `
    <select name="${name}">
      ${ map( options, option => `<option value=${option.id} ${ option.id == current ? "selected" : "" }>${option.name}</option>` ) }
    </select>
  `
}