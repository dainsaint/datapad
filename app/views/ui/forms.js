import { html } from "#core/utils"

export function RadioContent({ name, value, id, checked, label }) {
  return html`
    <label class="form-radio">
      ${ label }
      <input ${{id, name, value}} type="radio" ${{checked}} />
    </label>
  `
}