import { html } from "#core/utils";
import Action from "#models/action";

export default function ActionBuilder({ episode, action = new Action() } = {}) {
  return html`
    <form class="layout-row gap" >
      <h2>Action</h2>
      
      <h3>We use</h3>
      <div class="card" 
        hx-patch="${ action.toURL() }" 
        hx-trigger="dropcomplete"
        data-droppable>
        //main resource  
      </div>
      <h3>We aid with</h3>
      <div class="card">
        //additional resource
      </div>
    
    </form>

    <button hx-post="${episode.toURL(`/communities/create?society=${society.id}`)}" hx-target="#dialog">+ New Community</button>
  `
}