import { from, html } from "#core/utils";

export default function ActionResult({ action } = {}) {
  
  const icons = ["fa-square-minus", "fa-dice-one", "fa-dice-two", "fa-dice-three", "fa-dice-four", "fa-dice-five", "fa-dice-six"];
  action?.sanitizeResult();

  return html`
    <form hx-post="${action?.toURL("/result")}" hx-swap="none">
      ${ action?.result.map( (value, i) => html`
        <input type="hidden" name="result[${i}]" value="${value}"/>
        <button name="result[${i}]" class="is-size-4" value="${ (value - 1) < 0 ? 6 : (value - 1) }">
          <i class="fa ${icons[value]}"></i>
        </button>
      `)}
    </form>
  `;
}

