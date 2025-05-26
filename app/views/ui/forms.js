import { html } from "#core/utils"

export function RadioContent({ name, value, id, checked, label }) {
  return html`
    <label class="form-radio">
      ${ label }
      <input ${{id, name, value}} type="radio" ${{checked}} />
    </label>
  `
}

export function Checkbox({label, name = "", value = false, checked = false}){
  return html`
    <div class="form-control">
      <input name="${name}" type="checkbox" ${ checked && "checked" } value="${value}"/>
      <label for="${name}">${ label }</label>
    </div>
  `
}; 


export function Toggle({checkedLabel, uncheckedLabel, name = "", value = false, checked = false}){
  return html`
    <div class="form-toggle">
      <input name="${name}" type="checkbox" ${ checked && "checked" } value="${value}"/>
      <label class="form-toggle__unchecked" for="${name}">${ uncheckedLabel }</label>
      <label class="form-toggle__checked" for="${name}">${ checkedLabel }</label>
    </div>
  `
}; 


export function Select({ name, current, options }) {
  return html`
    <select name="${name}">
      ${ options.map( option => `<option value=${option.id} ${ option.id == current ? "selected" : "" }>${option.name}</option>` ) }
    </select>
  `
}