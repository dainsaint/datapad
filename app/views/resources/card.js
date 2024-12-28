import Resource from "../../models/resource.js";

export default function ResourceCard({ resource = new Resource() } = {}) {
  return `
    <a 
      id="resource-card-${resource.id}" 
      class="card color-contrast" 
      draggable="true" 

      hx-get="${resource.toURL('/edit')}"
      hx-target="#dialog"
      hx-trigger="click"
      
      data-draggable="[data-droppable]"
      data-tags="${resource.tags.toList()}" 
      >
      <h3>${resource.name}</h3>
      <input type="hidden" name="resource_ids[]" value="${resource.id}"/>
    </a>
  `;
}