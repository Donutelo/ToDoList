import iconImage from "./images/iconImage";

/* With DOMStuff I mean showing and disappearing things */
export const DOMStuff = (() => {
  function showModal(id="create-new-window", modalClass="todo-content"){
    const modalBackground = document.getElementById(id);

    if (modalBackground.classList.contains("hidden")){
      modalBackground.classList.remove("hidden");
      modalBackground.style.display = "flex";
    }

    const modal = modalBackground.querySelector(modalClass);
  }

  /*
  const taskBox = document.createElement("div");
  const editIcon = document.createElement("span");
  const deleteIcon = document.createElement("span");
  const descriptionButton = document.createElement("button");
  const checkIcon = document.createElement("input");
  const project = document.createElement("li");

  // Placing the icons
  editIcon.innerHTML = `<i class="fas fa-edit"></i>`;
  deleteIcon.innerHTML = `<i class="fas fa-trash"></i>`;
  checkIcon.type = "checkbox";

  descriptionButton.classList.add("description-button");
  descriptionButton.innerHTML = `Description`;
  
  project.classList.add("project-item");
  */

})();
