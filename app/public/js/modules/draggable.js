export default function initDraggables() {

  //DRAG
  const handleDrag = (event) => {
    const draggable = event.target;

    switch (event.type) {
      case "dragstart":
        draggable.classList.add("is-dragging");
        event.dataTransfer.effectAllowed = "all";
        event.dataTransfer.setData("text/html", draggable.innerHTML);
        console.log( event.dataTransfer );
        break;

      case "dragend":
        draggable.classList.remove("is-dragging");
        break;
    }
  };

  // DROP
  const handleDrop = (event) => {
    const query = event.srcElement.dataset.draggable || "[data-droppable]";
    const matches = event.target.matches(query);
    if (!matches) return false;

    const droppable = event.target;

    switch (event.type) {
      case "dragenter":
        droppable.classList.add("is-dropping"); 
        event.preventDefault();
        event.dataTransfer.dropEffect = droppable.dataset.dropeffect || "move";
        console.log( event.dataTransfer );
        break;

      case "dragover":
        event.preventDefault();
        console.log( event.dataTransfer );
        return false;
        break;

      case "dragleave":
        droppable.classList.remove("is-dropping");
        event.preventDefault();
                console.log( event.dataTransfer );
        break;

      case "drop":
        event.stopPropagation();
        event.preventDefault();
        console.log( event.dataTransfer );

        droppable.classList.remove("is-dropping");
        const draggableId = event.dataTransfer.getData("text/plain");
        const draggable = document.getElementById(draggableId);
        const receivable = droppable.dataset.droppable && droppable.querySelector(droppable.dataset.droppable) || droppable;
        
        if (receivable.contains(draggable)) 
          break;

        const origin = draggable?.parentElement;
        // const clone = draggable.cloneNode(true);
        // receivable.appendChild(clone);

 

        origin?.dispatchEvent(new CustomEvent("dropcomplete", { bubbles: true }));
        draggable?.dispatchEvent(new CustomEvent("dropcomplete", { bubbles: true }));

        break;
    }
  };

  htmx.onLoad( (element) => {
    element.querySelectorAll("[data-draggable]").forEach( node => {
      node.addEventListener("dragstart", handleDrag);
      node.addEventListener("dragend", handleDrag);
    })

    element.querySelectorAll("[data-droppable]").forEach( node => {
      node.addEventListener("dragenter", handleDrop);
      node.addEventListener("dragover", handleDrop);
      node.addEventListener("dragleave", handleDrop);
      node.addEventListener("drop", handleDrop);
    })
  })


};

