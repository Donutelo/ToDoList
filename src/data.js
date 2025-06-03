export const dataStuff = (() => {
  let allFormsData, formsData;

  let todoIndex = 1;

  function getFormsData(forms) {
    // Kinda of a bad name, but I don't have any other ideias at the moment
    allFormsData = new FormData(forms);
    formsData = {};

    formsData = Object.fromEntries(allFormsData.entries());
  }

  function setFormsData() {
    return formsData;
  }

  function storeInfo(obj) {
    if (obj === null) {
      return;
    }

    // If it's a todo
    if (obj["todo-title"]) {
      localStorage.setItem(
        `todo-priority-${todoIndex.toString()}`,
        obj.querySelector(".todo-priority")
      );
      localStorage.setItem(
        `todo-checkbox-${todoIndex.toString()}`,
        obj.querySelector(".todo-checkbox")
      );
      localStorage.setItem(
        `todo-description-button-${todoIndex.toString()}`,
        obj.querySelector(".todo-description-button")
      );
      localStorage.setItem(
        `todo-title-${todoIndex.toString()}`,
        obj.querySelector(".todo-title")
      );
      localStorage.setItem(
        `todo-date-${todoIndex.toString()}`,
        obj.querySelector(".todo-date")
      );
    }

    // if it's a project
    else if (obj["project-title"]) {
      // This will have to change, otherwise only one project will ever be in the storage
      // localStorage.setItem(
      //   "project-title",
      //   obj.querySelector("#project-title")
      // );
    }

    todoIndex += 1;
  }

  function setInfo() {
    const obj = {};

    obj["todoTitle"] = localStorage.getItem("");
  }

  return { getFormsData, setFormsData, storeInfo };
})();
