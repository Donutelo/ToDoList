import iconImage from "./images/iconImage";

/* With DOMStuff I mean showing and disappearing things */
export const DOMStuff = (() => {
  const todoContent = `<div class="todo-content">
            <div class="todo-content-title">
              <label for="todo-title">Title: </label>
              <input
                id="todo-title"
                type="text"
                name="todo-title"
                placeholder="Lesgo academy"
                required=""
              />
            </div>
            <div class="todo-content-description">
              <label for="todo-description">Description: </label>
              <input
                id="todo-description"
                type="text"
                name="todo-description"
                placeholder="Start pushing the ground"
              />
            </div>
            <div class="todo-content-date">
              <label for="todo-due-date">Due date: </label>
              <input
                type="date"
                id="todo-due-date"
                name="todo-due-date"
                required=""
              />
            </div>
            <div class="todo-content-submission">
              <div class="todo-content-priority">
                <p>Priority:</p>
                <label class="todo-priority-low-button">
                  <input
                    type="radio"
                    id="todo-priority-low"
                    name="todo-priority"
                    value="low"
                    required=""
                  />
                  Low</label
                >
                <label class="todo-priority-medium-button">
                  <input
                    type="radio"
                    id="todo-priority-medium"
                    name="todo-priority"
                    value="medium"
                    required=""
                  />
                  Medium</label
                >
                <label class="todo-priority-high-button">
                  <input
                    type="radio"
                    id="todo-priority-high"
                    name="todo-priority"
                    value="high"
                    required=""
                  />
                  High</label
                >
              </div>
              <button
                class="todo-content-submit"
                type="submit"
                value="add to do"
              >
                ...to do
              </button>
            </div>
          </div>`;

  /* In progress */
  const projectContent = ``;

  function showModal(id="create-new-window", modalClass="todo-content"){
    const modalBackground = document.getElementById(id);

    /* First of all, make the overview appear */
    removeHidden(modalBackground);
    modalBackground.style.display = "flex";

    if (modalClass === "todo-content"){
      const modalContent = todoContent;
    }
    else if (modalClass === "project-content"){
      const modalContent = projectContent;
    }
  
    const modal = modalBackground.querySelector('create-new-content');
    modal.innerHTML = modalContent;
  }

  function removeHidden(obj){
    if (obj.classList.contains("hidden")){ obj.classList.remove("hidden") }
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
