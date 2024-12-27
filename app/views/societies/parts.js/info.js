import { pluralize } from "../../../core/utils.js"

export default function SocietyInfo({ society }){
  const resources = society.getAllResources();

  return `
    <p class="subtitle">
      ${society.archetype} • 
      ${society.communities.length} 
      ${pluralize(society.communities.length, "community", "communities")} • 
      ${resources.length}
      ${pluralize(resources.length, "resource")}
    </p>
  `
}