export const dataStuff = (() => {
  let allFormsData, formsData;

  let projectIndex = 1;

  function getFormsData(forms) {
    // Kinda of a bad name, but I don't have any other ideias at the moment
    allFormsData = new FormData(forms);
    formsData = {};

    formsData = Object.fromEntries(allFormsData.entries());
  }

  function setFormsData() {
    return formsData;
  }

  function storeInfo({
    obj = {},
    todoIndex = undefined,
    projectIndex = undefined,
  } = {}) {
    if (obj === null) {
      return;
    }

    // If it's a todo
    if (obj.classList.contains("todo-item")){
      localStorage.setItem(
        `todo-priority-${todoIndex.toString()}`,
        JSON.stringify(obj.querySelector(".todo-priority"))
      );
      localStorage.setItem(
        `todo-checkbox-${todoIndex.toString()}`,
        JSON.stringify(obj.querySelector(".todo-checkbox"))
      );
      localStorage.setItem(
        `todo-description-button-${todoIndex.toString()}`,
        JSON.stringify(obj.querySelector(".todo-description-button"))
      );
      localStorage.setItem(
        `todo-title-${todoIndex.toString()}`,
        JSON.stringify(obj.querySelector(".todo-title"))
      );
      localStorage.setItem(
        `todo-date-${todoIndex.toString()}`,
        JSON.stringify(obj.querySelector(".todo-date"))
      );
    }

    // if it's a project
    else if (obj.classList.contains("project-item")) {
      localStorage.setItem(
        `project-title${projectIndex.toString()}`,
        JSON.stringify(obj.querySelector("#project-title"))
      );
    }
  }

  // this is unfinished
  function sendToDoInfo(index) {
    let title, priority, description, date, checkbox;
    const obj;

    title = JSON.parse(localStorage.getItem(`todo-title-${index}`));
    priority = JSON.parse(localStorage.getItem(`todo-priority-${index}`));
    description = JSON.parse(localStorage.getItem(`todo-description-button-${index}`));
    date = JSON.parse(localStorage.getItem(`todo-date-${index}`));
    checkbox = JSON.parse(localStorage.getItem(`todo-checkbox-${index}`));

    obj.push(title, priority, description, date, checkbox);

    return obj;
  }

  return { getFormsData, setFormsData, storeInfo };
})();
