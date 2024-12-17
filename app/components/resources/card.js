import Resource from "../../models/resource";

export default function ResourceCard({ resource = new Resource() } = {}) {
  return `
    <div id="resource-card-${resource.id}" class="card color-contrast draggable" draggable="true" data-exhausted="${resource.isExhausted}">
      <h3>${resource.name}</h3>
      <input type="hidden" name="resource_ids[]" value="${resource.id}"/>
    </div>
  `;
}