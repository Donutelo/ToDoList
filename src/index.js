import { format, parseISO } from "date-fns";

import { DOMStuff } from "./UI";

import "./css/styles.css";

document.addEventListener("DOMContentLoaded", function () {
  const modalOverviewButton = document.querySelector("#modal-overview-button");

  const allModalSidebarOptions = document.querySelectorAll(
    ".create-new-options > *"
  );

  const modalCloseButton = document.querySelector(".close-button");

  const modalOverview = document.querySelector("#create-new-window");

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

  // Disapper with the formulary when closed
  modalCloseButton.addEventListener("click", () => {
    DOMStuff.addHidden(modalOverview);
  });
});
