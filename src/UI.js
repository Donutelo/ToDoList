import iconImage from "./images/iconImage";

export const DOMStuff = (() => {
  const taskBox = document.createElement("div");
  const editIcon = document.createElement("span");
  const deleteIcon = document.createElement("span");
  const descriptionButton = document.createElement("button");
  const checkIcon = document.createElement("input");
  const project = document.createElement("li");

  // Placing the icons
  editIcon.innerHTML = `<i class="fal fa-edit"></i>`;
  deleteIcon.innerHTML = `<i class="fal fa-edit"></i>`;
  checkIcon.innerHTML = `<i class="fa-regular fa-square"></i>`;

  descriptionButton.classList.add("description-button");
  descriptionButton.innerHTML = `Description`;
  
  project.classList.add("project-item");
})();
