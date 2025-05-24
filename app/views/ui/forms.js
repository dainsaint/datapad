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