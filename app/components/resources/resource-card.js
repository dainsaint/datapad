import Resource from "../../models/resource.js";

export default function ResourceCard({ resource = new Resource() } = {}) {
  return `
    <div 
      id="resource-card-${resource.id}" 
      class="card color-contrast draggable" 
      draggable="true" 
      data-tags="${ resource.tags.toList() }" 
      hx-get="${ resource.toURL('?view=edit') }"
      hx-target="#dialog"
      hx-trigger="click">
      <h3>${resource.name}</h3>
      <input type="hidden" name="resource_ids[]" value="${resource.id}"/>
    </div>
  `;
}