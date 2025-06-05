import { from, html } from "#core/utils";

export default function TurnRisk({ turn } = {}) {
  const { risk, advantage, disadvantage } = turn;

  return html`
    <form hx-post="${ turn.toURL() }" hx-trigger="change" hx-swap="none">
      <fieldset class="layout-row gap-tight">
        <label for="risk" style=""><i class="fa fa-skull"></i></label>
        <select class="is-uppercase is-size-6" name="risk" style="flex-basis: auto;">
          ${ from(0).to(6).map( r =>
              html`<option value="${r}" ${{selected: r == risk }}>Risk ${r}</option>`
            )}
        </select>

        <label for="advantage" style=""><i class="fa fa-heart"></i></label>
        <select class="is-uppercase is-size-6"  name="advantage" style="flex-basis: auto;">
          ${ from(0).to(2).map( a =>
              html`<option value="${a}" ${{selected: a == advantage }}>Adv ${a}</option>`
            )}
        </select>

        <label for="disadvantage" style=""><i class="fa fa-heart-broken"></i></label>
        <select class="is-uppercase is-size-6"  name="disadvantage" style="flex-basis: auto;">
          ${ from(0).to(2).map( d =>
              html`<option value="${d}" ${{selected: d == disadvantage }}>Dis ${d}</option>`
            )}
        </select>
      </fieldset>

    </form>
  `;
}

