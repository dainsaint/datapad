import { pluralize } from "#core/utils";

export default function SocietyInfo({ society }){
  return `
    <p class="subtitle">
      ${society.archetype} • 
      ${society.communities.length} 
      ${pluralize(society.communities.length, "community", "communities")} • 
      ${society.resources.length}
      ${pluralize(society.resources.length, "resource")}
    </p>
  `
}