import iconImage from "../src/images/editImage.png";

import { format } from "date-fns";

import { dataStuff } from "./data";

export let todoIndex = 1;

/* With DOMStuff I mean showing and disappearing things */
export const DOMStuff = (() => {
  /* const todoContent = `<div class="todo-content">
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
          </div>`; */

  // creating the todoContent the long way
  const todoContent = document.createElement("div");
  todoContent.classList.add("todo-content");

  // --- Seção do Título ---
  const todoContentTitle = document.createElement("div");
  todoContentTitle.classList.add("todo-content-title");

  const labelTitle = document.createElement("label");
  labelTitle.setAttribute("for", "todo-title");
  labelTitle.textContent = "Title: ";

  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("id", "todo-title");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("name", "todo-title");
  inputTitle.setAttribute("placeholder", "Lesgo academy");
  inputTitle.setAttribute("required", "");

  todoContentTitle.appendChild(labelTitle);
  todoContentTitle.appendChild(inputTitle);
  todoContent.appendChild(todoContentTitle);

  // --- Seção da Descrição ---
  const todoContentDescription = document.createElement("div");
  todoContentDescription.classList.add("todo-content-description");

  const labelDescription = document.createElement("label");
  labelDescription.setAttribute("for", "todo-description");
  labelDescription.textContent = "Description: ";

  const inputDescription = document.createElement("input");
  inputDescription.setAttribute("id", "todo-description");
  inputDescription.setAttribute("type", "text");
  inputDescription.setAttribute("name", "todo-description");
  inputDescription.setAttribute("placeholder", "Start pushing the ground");

  todoContentDescription.appendChild(labelDescription);
  todoContentDescription.appendChild(inputDescription);
  todoContent.appendChild(todoContentDescription);

  // data section
  const todoContentDate = document.createElement("div");
  todoContentDate.classList.add("todo-content-date");

  const labelDate = document.createElement("label");
  labelDate.setAttribute("for", "todo-due-date");
  labelDate.textContent = "Due date: ";

  const inputDate = document.createElement("input");
  inputDate.setAttribute("type", "date");
  inputDate.setAttribute("id", "todo-due-date");
  inputDate.setAttribute("name", "todo-due-date");
  inputDate.setAttribute("required", "");

  todoContentDate.appendChild(labelDate);
  todoContentDate.appendChild(inputDate);
  todoContent.appendChild(todoContentDate);

  // submission and priority section
  const todoContentSubmission = document.createElement("div");
  todoContentSubmission.classList.add("todo-content-submission");

  const todoContentPriority = document.createElement("div");
  todoContentPriority.classList.add("todo-content-priority");

  const priorityParagraph = document.createElement("p");
  priorityParagraph.textContent = "Priority:";
  todoContentPriority.appendChild(priorityParagraph);

  // helper function for radio button
  function createPriorityRadioButton(value, text) {
    const label = document.createElement("label");
    label.classList.add(`todo-priority-${value}-button`);

    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("id", `todo-priority-${value}`);
    input.setAttribute("name", "todo-priority");
    input.setAttribute("value", value);
    input.setAttribute("required", "");

    label.appendChild(input);
    label.appendChild(document.createTextNode(text));
    return label;
  }

  // radio button
  todoContentPriority.appendChild(createPriorityRadioButton("low", "Low"));
  todoContentPriority.appendChild(
    createPriorityRadioButton("medium", "Medium")
  );
  todoContentPriority.appendChild(createPriorityRadioButton("high", "High"));

  todoContentSubmission.appendChild(todoContentPriority);

  todoContent.appendChild(todoContentSubmission);

  const submitButton = document.createElement("button");
  submitButton.classList.add("todo-content-submit");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "add to do");
  submitButton.textContent = "...to do";

  todoContent.appendChild(submitButton);

  /* and now the project thing */

  /* const projectContent = `<div class="project-content">
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
    */

  const projectContent = document.createElement("div");
  projectContent.classList.add("project-content");

  // title
  const labelProjectTitle = document.createElement("label");
  labelProjectTitle.setAttribute("for", "project-title");
  labelProjectTitle.textContent = "Title: ";
  projectContent.appendChild(labelProjectTitle);

  const inputProjectTitle = document.createElement("input");
  inputProjectTitle.setAttribute("id", "project-title");
  inputProjectTitle.setAttribute("type", "text");
  inputProjectTitle.setAttribute("name", "project-title");
  inputProjectTitle.setAttribute("required", "");
  projectContent.appendChild(inputProjectTitle);

  // submission section
  const submitProjectButton = document.createElement("button");
  submitProjectButton.classList.add("project-content-submit");
  submitProjectButton.setAttribute("type", "submit");
  submitProjectButton.setAttribute("value", "add project");
  submitProjectButton.textContent = "...project";
  projectContent.appendChild(submitProjectButton);

  const modal = document.querySelector(".create-new-content");
  const modalEditOverview = document.querySelector("#edit-forms-window");
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

    modal.innerHTML = '';
    modal.appendChild(modalContent);
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
    todoImageEdit.src = iconImage;
    todoDescriptionButton.appendChild(todoImageEdit);

    const todoTitle = document.createElement("div");
    todoTitle.classList.add("todo-title");
    todoTitle.textContent = obj["todo-title"];

    const todoDueDate = document.createElement("div");
    todoDueDate.classList.add("todo-date");
    todoDueDate.textContent = format(obj["todo-due-date"], "dd/MM");

    todoDescriptionButton.addEventListener("click", () => {
      removeHidden(modalEditOverview);
      // I should just add call an 'loadEditContent' here
      loadEditContent(todoDescriptionButton);
    });

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

  function loadEditContent(obj) {
    // I misunderstood here, should have call the forms function
    // getting the todo index, since is the same as the forms
    let todoFormsIndex = obj.parentElement.dataset.index;

    const toDoFormsInfo = dataStuff.setFormsData(todoFormsIndex); // Completely useless?
  
    let formsContent = document.querySelector(".edit-forms-content");
    formsContent.innerHTML = "";

    const clonedNodes = Array.from(todoContent.children).map((node) =>
      node.cloneNode(true)
    );

    clonedNodes.forEach((node) => {
      formsContent.appendChild(node);
    });

    // formsContent.appendChild();
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
