import "./css/styles.css";

import { format, parseISO } from "date-fns";

import { DOMStuff, todoIndex } from "./UI";

import { dataStuff } from "./data";

document.addEventListener("DOMContentLoaded", function () {
  /* Modal overview stuff */
  const modalOverviewButton = document.querySelector("#modal-overview-button");

  const allModalSidebarOptions = document.querySelectorAll(
    ".create-new-options > *"
  );

  const closeButtons = document.querySelectorAll(".close-button");

  const modalOverview = document.querySelector("#create-new-window");

  const mainContent = document.querySelector(".main-content");

  // The forms
  const modalForms = document.querySelector(".create-new");

  // The edit forms
  const modalFormsEdit = document.querySelector(".edit-forms");

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
      // ugly but ok
      DOMStuff.addHidden(button.parentElement.parentElement.parentElement);
    });
  });

  let formsData;
  /* Getting the form's data when submitted */
  modalForms.addEventListener("submit", function (e) {
    e.preventDefault();
    dataStuff.getFormsData({forms: this});

    // And object with all the forms data
    formsData = dataStuff.setFormsData(todoIndex);

    // Creating the ToDo by the UI
    const todoDOM = DOMStuff.addToDo(formsData);
    mainContent.appendChild(todoDOM);
  });

  // Do later.
  // The later has come, what should I do again?
  // Getting the form's edit data when submitted
  modalFormsEdit.addEventListener("submit", function (e) {
    e.preventDefault();
    dataStuff.editFormsData({forms: this});

    newToDoInfo = dataStuff.setFormsData();

    
  });

});
