import { html } from "#core/utils";
import Episode from "#models/episode";
import { SocietyArchetype, SocietyColor } from "#models/society";
import { RadioContent } from "#views/ui/forms";
import Icon from "#views/ui/icon";

//figure out the society/episode jawn here...
export default function SocietyCreate({ episode = new Episode()} = {}) {
  return html`
    <form class="stack-loose" hx-post="${ episode.toURL('/societies') }" hx-swap="none">
      <header>
        <h1>Create a new society</h1>
        <input type="hidden" name="episodeId" value="${episode.id}"/>
      </header>

      <fieldset>
        <label for="name">Society Name</label>
        <input name="name" placeholder="New Society" autocapitalize="words" autofocus required/>
      </fieldset>

      <fieldset>
        <label for="name">Society Archetype</label>
        <div class="grid-four gap-tight">
          ${Object.values(SocietyArchetype).map( archetype => SocietyArchetypeInput({ archetype }))}
        </div>
      </fieldset>


      <fieldset>
        <label for="name">Society Color</label>
        <div class="grid-seven gap-tight">
          ${Object.values(SocietyColor).map( color => SocietyColorInput({ color }))}
        </div>
      </fieldset>

      <footer class="layout-spread stack-push">
        <button type="submit">${Icon("planet")} New Society</button>
        <button type="button" value="cancel">Cancel</button>
      </footer>
    </form>
  `;
}

export function SocietyArchetypeInput({ archetype, checked }) {
  return RadioContent({ 
    name: "archetype", 
    value: archetype, 
    checked,
    label: html`
      <div class="align-center">
        <div class="is-size-1">${Icon.forArchetype(archetype)}</div>
        <div class="is-size-6">${archetype}</div>
      </div>`})

}

export function SocietyColorInput({ color, checked }) {
  return RadioContent({ 
    name: "color", 
    value: color, 
    checked,
    label: html`<div class="card ${color}">&nbsp;</div>`
  })
}