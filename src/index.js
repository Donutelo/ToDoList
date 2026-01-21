import "./css/styles.css";

import { format, parseISO } from "date-fns";

import { DOMStuff } from "./UI";

import { dataStuff } from "./data";

import { optionsWithListener, todoIndex, projectIndex } from "./options";

document.addEventListener("DOMContentLoaded", function () {
  /* Modal overview stuff */
  const modalOverviewButton = document.querySelector("#modal-overview-button");

  const allModalSidebarOptions = document.querySelectorAll(
    ".create-new-options > *"
  );

  const closeButtons = document.querySelectorAll(".close-button");
  const modalOverview = document.querySelector("#create-new-window");

  // The forms
  const modalForms = document.querySelector(".create-new");

  // The edit forms
  const modalFormsEdit = document.querySelector(".edit-forms");

  // Checkbox from the ToDos, to update in the localStorage
  const mainContainer = document.querySelector(".main-content");

  // If the user click in the menu icon in case the screen is less or equals to 700px
  const menuIcon = document.querySelector(".menu-icon");

  mainContainer.addEventListener("change", (event) => {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "checkbox"
    ) {
      let dataIndex = Number(event.target.closest(".todo-item").dataset.index);
      const obj = JSON.parse(localStorage.getItem(`todo-${dataIndex}`));
      const status = event.target.checked;
      obj.checked = status;
      localStorage.setItem(`todo-${dataIndex}`, JSON.stringify(obj));
    }
  });

  // if there is already data in the local storage
  var lclStogareLen = localStorage.length;

  if (lclStogareLen > 0) {
    DOMStuff.loadAllToDos(lclStogareLen);
    DOMStuff.loadAllProjects(lclStogareLen);
  }

  /* Event listener for the 'All' in the sidebar */
  const allButton = document.querySelector(".all-tasks");

  allButton.addEventListener("click", () => {
    DOMStuff.loadAllToDos(lclStogareLen);
  });

  /* Event listener for the 'Week' in the sidebar */
  const weekButton = document.querySelector(".week-tasks");

  weekButton.addEventListener("click", () => {
    mainContainer.innerHTML = "";
    const currentDate = new Date();
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);

      if (key.startsWith("forms-index-")) {
        let todoDueDate = new Date(JSON.parse(value)["todo-due-date"]);
        if (todoDueDate >= currentDate && todoDueDate <= nextWeek) {
          const todoDOM = DOMStuff.addToDo(JSON.parse(value));
          DOMStuff.addToDoDOM(todoDOM);
        }
      }
    }
  });

  /* Event listener in the modal overview button */
  modalOverviewButton.addEventListener("click", () => {
    DOMStuff.removeHidden(modalOverview);
  });

  /* Putting the event listener in the modal side items */
  allModalSidebarOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      const optClass = opt.classList[0];

      if (optClass === "todo-section") {
        DOMStuff.showModal({ modalClass: "todo-content" });
      } else if (optClass === "project-section") {
        DOMStuff.showModal({ modalClass: "project-content" });
      }
    });
  });

  // Disapper with the form when closed
  closeButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      // ugly but ok, I think
      DOMStuff.addHidden(button.parentElement.parentElement.parentElement);
    });
  });

  // Getting the form's data when submitted
  modalForms.addEventListener("submit", function (e) {
    e.preventDefault();
    dataStuff.setFormsData({ forms: this });

    // And object with all the forms data
    let formsData = dataStuff.getFormsData({ forms: this });

    if (formsData === undefined) {
      throw new Error("The forms is empty or something.");
    } else if (formsData["todo-description"]) {
      // Creating the ToDo by the UI
      const todoDOM = DOMStuff.addToDo(formsData);
      DOMStuff.addToDoDOM(todoDOM);
    } else if (formsData["project-title"]) {
      // well, now what again? this should put the project in the sidebar
      DOMStuff.insertProject(formsData);
    }
  });

  // Do later.
  // The later has come, what should I do again?
  // Getting the form's edit data when submitted
  modalFormsEdit.addEventListener("submit", function (e) {
    e.preventDefault();
    // Why I am trying to edit the forms before getting the information?
    // Using this todoIndex sounds dangerous
    dataStuff.editFormsData({ forms: this, todoIndex: todoIndex });

    // Getting the forms and sending to the newToDoInfo
    let todoFormsIndex = modalFormsEdit.dataset.index;
    let newToDoInfo = dataStuff.getFormsData({ forms: this });

    // In here I should call the editToDoInfo
    dataStuff.editToDoInfo(todoFormsIndex, newToDoInfo);
  });

  menuIcon.addEventListener("click", (e) => {
    const style = window.getComputedStyle(menuIcon);
    const transform = style.transform;

    if (transform && transform !== 'none') {
      const matrix = new DOMMatrixReadOnly(transform);

      if (matrix.m41 < -window.innerWidth + 1) {
        style.transform
      }
    }
  })
});
