document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const sections = document.querySelectorAll(".panel-body");

  cards.forEach((card) => {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
  });

  sections.forEach((section) => {
    section.addEventListener("dragover", dragOver);
    section.addEventListener("dragenter", dragEnter);
    section.addEventListener("dragleave", dragLeave);
    section.addEventListener("drop", drop);
  });

  let draggedCard = null;

  function dragStart(e) {
    draggedCard = this;
    setTimeout(() => {
      this.style.display = "none";
    }, 0);
  }

  function dragEnd(e) {
    this.style.display = "block";
    draggedCard = null;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
    this.classList.add("drag-over");
  }

  function dragLeave(e) {
    this.classList.remove("drag-over");
  }

  function drop(e) {
    this.classList.remove("drag-over");
    if (draggedCard) {
      this.appendChild(draggedCard);
      draggedCard.style.display = "block";

      // Update card status and styling
      const sectionId = this.id;
      if (sectionId === "resolved") {
        draggedCard.classList.add("resolved");
        draggedCard.classList.remove("notResolved");
        draggedCard.setAttribute("data-status", "resolved");
      } else {
        draggedCard.classList.add("notResolved");
        draggedCard.classList.remove("resolved");
        draggedCard.setAttribute("data-status", sectionId);
      }
    }
  }
});
