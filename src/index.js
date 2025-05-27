import "./css/styles.css";

import { format, parseISO } from "date-fns";

import { DOMStuff } from "./UI";

import { dataStuff } from "./data";

document.addEventListener("DOMContentLoaded", function () {
  /* Modal overview stuff */
  const modalOverviewButton = document.querySelector("#modal-overview-button");

  const allModalSidebarOptions = document.querySelectorAll(
    ".create-new-options > *"
  );

  const modalCloseButton = document.querySelector(".close-button");

  const modalOverview = document.querySelector("#create-new-window");

  // The forms
  const modalForms = document.querySelector(".create-new");

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
  modalCloseButton.addEventListener("click", function(e) {
    e.preventDefault();
    DOMStuff.addHidden(modalOverview);
  });

  let formsData;
  /* Getting the form's data when submitted */
  modalForms.addEventListener("submit", function(e) {
    e.preventDefault();
    dataStuff.getFormsData(this);
    // And object with all the forms data
    formsData = dataStuff.setFormsData();
  });

  /* Creating the ToDo by the UI */
  

});
