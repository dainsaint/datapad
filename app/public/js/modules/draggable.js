export default function initDraggables() {
  //DRAG
  const handleDrag = (event) => {
    if (!event.target.matches("[data-draggable]")) return;
    const draggable = event.target;

    switch (event.type) {
      case "dragstart":
        draggable.classList.add("is-dragging");
        const dt = event.dataTransfer;
        dt.setData("text/plain", draggable.id);
        break;

      case "dragend":
        draggable.classList.remove("is-dragging");
        break;
    }
  };

  // DROP
  const handleDrop = (event) => {
    const query = event.srcElement.dataset.draggable || "[data-droppable]";
    const droppable = event.target.closest(query);
    if (!droppable) return;

    switch (event.type) {
      case "dragenter":
      case "dragover":
        droppable.classList.add("is-dropping");
        event.preventDefault();
        break;

      case "dragleave":
        droppable.classList.remove("is-dropping");
        event.preventDefault();
        break;

      case "drop":
        droppable.classList.remove("is-dropping");

        const draggableId = event.dataTransfer.getData("text/plain");
        const draggable = document.getElementById(draggableId);
        const receivable = droppable.querySelector(droppable.dataset.droppable) || droppable;
        
        if (receivable.contains(draggable)) 
          break;

        const origin = draggable?.parentElement;
        receivable.appendChild(draggable);

        origin?.dispatchEvent(new CustomEvent("dropcomplete", { bubbles: true }));
        draggable?.dispatchEvent(new CustomEvent("dropcomplete", { bubbles: true }));

        break;
    }
  };

  document.body.addEventListener("dragstart", handleDrag);
  document.body.addEventListener("dragend", handleDrag);
  document.body.addEventListener("dragenter", handleDrop);
  document.body.addEventListener("dragover", handleDrop);
  document.body.addEventListener("dragleave", handleDrop);
  document.body.addEventListener("drop", handleDrop);
};