/* import iconImage from "./images/iconImage"; */

import { format } from "date-fns";

import { dataStuff } from "./data";

let todoIndex = 1;

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
  const projectContent = `<div class="project-content">
            <label for="project-title">Title: </label>
            <input
              id="project-title"
              type="text"
              name="project-title"
              required=""
            />
            <button
                class="project-content-submit"
                type="submit"
                value="add project"
              >
                ...project
              </button>
          </div>`;

  const modal = document.querySelector(".create-new-content");

  let modalContent;

  function showModal({
    id = "create-new-window",
    modalClass = "todo-content",
  } = {}) {
    const modalBackground = document.getElementById(id);

    /* First of all, make the overview appear */
    removeHidden(modalBackground);
    modalBackground.style.display = "flex";

    if (modalClass === "todo-content") {
      modalContent = todoContent;
    } else if (modalClass === "project-content") {
      modalContent = projectContent;
    }

    modal.innerHTML = modalContent;
  }

  function removeHidden(obj) {
    if (obj === null) {
      return;
    }

    if (obj.classList.contains("hidden")) {
      obj.classList.remove("hidden");
    }
  }

  function addHidden(obj) {
    if (obj === null) {
      return;
    }

    if (!obj.classList.contains("hidden")) {
      obj.classList.add("hidden");
    }
  }

  function addToDo(obj) {
    if (obj === null) {
      return;
    }

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.dataset.index = todoIndex;

    const todoPriority = document.createElement("div");

    if (obj["todo-priority"] === "low") {
      todoPriority.classList.add("todo-priority-low");
    } else if (obj["todo-priority"] === "medium") {
      todoPriority.classList.add("todo-priority-medium");
    } else if (obj["todo-priority"] === "high") {
      todoPriority.classList.add("todo-priority-high");
    }

    const todoCheckbox = document.createElement("label");
    todoCheckbox.classList.add("todo-checkbox");

    const todoInputCheckbox = document.createElement("input");
    todoInputCheckbox.setAttribute("type", "checkbox");

    todoCheckbox.appendChild(todoInputCheckbox);

    const todoDescriptionButton = document.createElement("button");
    todoDescriptionButton.classList.add("todo-description-button");
    const todoImageEdit = document.createElement("img");
    todoImageEdit.src = "images/editImage.png";
    todoDescriptionButton.appendChild(todoImageEdit);

    const todoTitle = document.createElement("div");
    todoTitle.classList.add("todo-title");
    todoTitle.textContent = obj["todo-title"];

    const todoDueDate = document.createElement("div");
    todoDueDate.classList.add("todo-date");
    todoDueDate.textContent = format(obj["todo-due-date"], "dd/MM");

    todoItem.appendChild(todoPriority);
    todoItem.appendChild(todoCheckbox);
    todoItem.appendChild(todoDescriptionButton);
    todoItem.appendChild(todoTitle);
    todoItem.appendChild(todoDueDate);

    // Putting in the storage
    dataStuff.storeInfo({ obj: todoItem, todoIndex: todoIndex });
    todoIndex = todoIndex + 1;
    return todoItem;
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

  return { showModal, addHidden, removeHidden, addToDo };
})();
