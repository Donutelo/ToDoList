import iconImage from "../src/images/editImage.png";

import deleteIcon from "../src/images/deleteIcon.png";

import { format, parseISO } from "date-fns";

import { dataStuff } from "./data";

import {
  optionsWithListener,
  todoIndex,
  projectIndex,
  addTodoIndex,
  addProjectIndex,
} from "./options";

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

  // the hidden input
  const hiddenLabel = document.createElement("label");
  hiddenLabel.classList.add("todo-project-label", "hidden");

  const hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "todo-project");

  hiddenLabel.appendChild(hiddenInput);
  todoContent.appendChild(hiddenLabel);

  // dropdown part
  const dropdownDivProjects = document.createElement("div");
  dropdownDivProjects.classList.add("dropdown");

  const dropdownTitleProject = document.createElement("div");
  dropdownTitleProject.classList.add("dropdown-title");
  dropdownTitleProject.textContent = "Select a project:";
  dropdownTitleProject.addEventListener("click", toggleMenuDisplay);

  const dropdownRightArrow = document.createElement("i");
  dropdownRightArrow.classList.add("fa", "fa-angle-right");
  dropdownTitleProject.appendChild(dropdownRightArrow);

  const dropdownProjects = document.createElement("div");
  dropdownProjects.classList.add("dropdown-menu", "hidden");

  dropdownDivProjects.appendChild(dropdownTitleProject);
  dropdownDivProjects.appendChild(dropdownProjects);
  todoContent.appendChild(dropdownDivProjects);

  const submitButton = document.createElement("button");
  submitButton.classList.add("todo-content-submit");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "add to do");
  submitButton.textContent = "...to do";
  submitButton.addEventListener("click", function () {
    hiddenInput.value = dropdownTitleProject.firstChild.nodeValue;
  });

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

  // the project things
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

  // Project stuff, a listener if a project is added
  // and the if a project was created it is added at the dropdown
  const container = document.querySelector(".project-list");

  const dropdownOptions = [];

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        // const options = document.querySelectorAll(".dropdown-menu .option");

        const projects = document.querySelectorAll(".project-item");

        // const optionsTitles = Array.from(options).map(e => e.innerText);

        const projectsTitles = Array.from(projects).map((e) => e.innerText);

        // emptying the array to avoid duplication
        dropdownOptions.splice(0, dropdownOptions.length);

        projectsTitles.forEach((option) => {
          const newOption = document.createElement("div");
          newOption.classList.add("option");
          newOption.textContent = option;
          dropdownOptions.push(newOption);
        });

        dropdownOptions.forEach((option) => {
          if (!optionsWithListener.has(option)) {
            option.addEventListener("click", handleOptionSelected);
            optionsWithListener.add(option);
          }
        });
      }
    }
  });

  observer.observe(container, { childList: true });

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
      dropdownProjects.innerHTML = "";
      dropdownOptions.forEach((option) => {
        dropdownProjects.appendChild(option);
      });
    } else if (modalClass === "project-content") {
      modalContent = projectContent;
    }

    modal.innerHTML = "";
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

  function addTransparent(obj) {
    if (obj === null) {
      return;
    }

    if (!obj.classList.contains("tranparent")) {
      obj.classList.add("transparent");
    }
  }

  function addToDo(obj) {
    if (obj === null) {
      return;
    }

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    if (obj["index"]) {
      todoItem.dataset.index = obj["index"];
    } else {
      todoItem.dataset.index = todoIndex;
    }

    // I shouldn't had create this, but now it's annoying to change
    const todoPriority = document.createElement("div");

    if (obj["todo-priority"] === "low") {
      todoPriority.classList.add("todo-priority-low");
      todoPriority.textContent = "low";
    } else if (obj["todo-priority"] === "medium") {
      todoPriority.classList.add("todo-priority-medium");
      todoPriority.textContent = "medium";
    } else if (obj["todo-priority"] === "high") {
      todoPriority.classList.add("todo-priority-high");
      todoPriority.textContent = "high";
    }

    DOMStuff.addTransparent(todoPriority);

    const todoCheckbox = document.createElement("label");
    todoCheckbox.classList.add("todo-checkbox");

    const todoInputCheckbox = document.createElement("input");
    todoInputCheckbox.setAttribute("type", "checkbox");

    todoCheckbox.appendChild(todoInputCheckbox);

    const todoDeleteButton = document.createElement("button");
    todoDeleteButton.classList.add("todo-delete-button");
    const todoImageDelete = document.createElement("img");
    todoImageDelete.src = deleteIcon;
    todoDeleteButton.appendChild(todoImageDelete);

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
    let todoDueDateText = parseISO(obj["todo-due-date"]);
    todoDueDate.textContent = format(todoDueDateText, "dd//MM");

    todoDescriptionButton.addEventListener("click", () => {
      removeHidden(modalEditOverview);
      // I should just call an 'loadEditContent' here
      loadEditContent(todoDescriptionButton);
    });

    todoDeleteButton.addEventListener("click", function (e) {
      let todoItem = e.target.closest(".todo-item");
      deleteTodo(todoItem);
    });

    todoItem.appendChild(todoPriority);
    todoItem.appendChild(todoCheckbox);
    todoItem.appendChild(todoDeleteButton);
    todoItem.appendChild(todoDescriptionButton);
    todoItem.appendChild(todoTitle);
    todoItem.appendChild(todoDueDate);

    // Putting in the storage, I ended up repeting myself here, but
    // perphaps is more simple this way.
    if (!obj["index"]) {
      dataStuff.storeInfo({ obj: obj, todoIndex: todoIndex });
      addTodoIndex();
    }

    return todoItem;
  }

  function editToDo(index, todoInfo) {
    // this will be the last stop from the edit
    // it will start in the index, pass to data and end here

    // take the new proprerties into variables
    const priority = todoInfo["todo-priority"];
    const dueDate = todoInfo["todo-due-date"];
    const title = todoInfo["todo-title"];

    const todoItem = document.querySelector(
      `.todo-item[data-index="${index}"]`
    );

    // taking the old properties from the DOM
    const todoPriority = todoItem.querySelector('[class^="todo-priority-"]');
    const todoDueDate = todoItem.querySelector(".todo-date");
    const todoTitle = todoItem.querySelector(".todo-title");

    // updating
    todoTitle.textContent = title;
    todoDueDate.textContent = format(dueDate, "dd/MM");

    todoPriority.classList = "";
    todoPriority.classList.add("todo-priority-" + priority);
    todoPriority.classList.add("transparent");
  }

  function loadEditContent(obj) {
    // I misunderstood here, should have call the forms function
    // getting the todo index, since is the same as the forms
    let todoFormsIndex = obj.parentElement.dataset.index;
    const modalFormsEdit = document.querySelector(".edit-forms");

    modalFormsEdit.dataset.index = "";
    modalFormsEdit.dataset.index = todoFormsIndex;

    // const toDoFormsInfo = dataStuff.setFormsData(todoFormsIndex); // Completely useless?

    // I have to change this, but one thing at the time
    // why do I have to change this?
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

  function toggleMenuDisplay(e) {
    const trigger = e.currentTarget;
    const dropdown = trigger.closest(".dropdown");
    if (!dropdown) return;

    const menu = dropdown.querySelector(".dropdown-menu");
    const icon = dropdown.querySelector(".fa-angle-right");

    if (menu) menu.classList.toggle("hidden");
    if (icon) icon.classList.toggle("rotate-90");
  }

  function handleOptionSelected(e) {
    const dropdown = e.currentTarget.closest(".dropdown");
    const menu = dropdown.querySelector(".dropdown-menu");
    const title = dropdown.querySelector(".dropdown-title");
    const icon = title.querySelector(".fa");
    const option = e.target;

    // Atualizar título
    title.firstChild.textContent = option.textContent + " ";

    // Fechar menu
    menu.classList.toggle("hidden");

    // Disparar evento customizado
    title.dispatchEvent(new Event("change"));

    // Aplicar rotação do ícone com transição funcionando
    setTimeout(() => {
      icon.classList.toggle("rotate-90");
    }, 0);
  }

  function insertProject(obj) {
    let projectList = document.querySelector(".project-list");
    let newProject = document.createElement("li");
    let hashtag = document.createElement("i");

    hashtag.classList.add("fa-solid", "fa-hashtag");
    newProject.appendChild(hashtag);
    newProject.classList.add("project-item");

    newProject.addEventListener("click", () => {
      document.querySelector(".main-content").innerHTML = "";
      const projectName = obj["project-title"];
      const len = localStorage.length;

      for (let i = 0; i < len; i++) {
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage.getItem(key));

        if (typeof value["todo-project"] !== "string") {
          continue;
        }

        if (
          key.startsWith("forms-index-") &&
          value["todo-project"].trim() == projectName
        ) {
          const todoDOM = addToDo(value);
          addToDoDOM(todoDOM);
        }
      }
    });

    newProject.appendChild(document.createTextNode(`${obj["project-title"]}`));
    projectList.appendChild(newProject);

    // dataStuff.storeInfo({ obj: obj, projectIndex: projectIndex });
    if (!obj["project-index"]) {
      addProjectIndex();
    }
  }

  function deleteTodo(obj) {
    dataStuff.deleteTodoInfo(obj);
    obj.remove();
  }

  function loadAllToDos(len) {
    document.querySelector(".main-content").innerHTML = "";

    for (let i = 0; i < len; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      if (key.startsWith("forms-index-")) {
        const todoDOM = addToDo(JSON.parse(value));
        addToDoDOM(todoDOM);
      }
    }
  }

  function loadAllProjects(len) {
    document.querySelector(".project-list").innerHTML = "";

    for (let i = 0; i < len; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      if (key.startsWith("project-index-")) {
        const project = JSON.parse(value);
        insertProject(project);
      }
    }
  }

  function addToDoDOM(todoDOM) {
    document.querySelector(".main-content").appendChild(todoDOM);
  }

  return {
    showModal,
    addHidden,
    removeHidden,
    addToDo,
    editToDo,
    addTransparent,
    handleOptionSelected,
    insertProject,
    loadAllToDos,
    addToDoDOM,
    loadAllProjects,
  };
})();
