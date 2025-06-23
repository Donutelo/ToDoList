import { todoIndex } from './UI.js';

export const dataStuff = (() => {
  let allFormsData, formsData;

  let projectIndex = 1;

  // should change this arguments
  function getFormsData({
    forms = {},
    projectIndex = undefined,
  } = {}) {
    // Kinda of a bad name, but I don't have any other ideias at the moment
    allFormsData = new FormData(forms);
    formsData = {};

    formsData = Object.fromEntries(allFormsData.entries());
    formsData['index'] = todoIndex;

    localStorage.setItem(`forms-index-${todoIndex}`, formsData);
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
    if (obj.classList.contains("todo-item")) {
      localStorage.setItem(
        `todo-priority-${todoIndex.toString()}`,
        JSON.stringify(obj.querySelector(".todo-priority"))
      );
      // it's relevant that I save this not for the edit forms, but for the 'ToDo' stay the same when the page reload

      const todoData = {
        priority: obj.querySelector(".todo-priority").textContent, // Ou innerHTML, dependendo do conteúdo
        checked: obj.querySelector(".todo-checkbox").checked,
        description: obj.querySelector(".todo-description-button").textContent, // Se for o texto do botão
        title: obj.querySelector(".todo-title").textContent,
        date: obj.querySelector(".todo-date").value, // Ou value se for um input de data
        index: todoIndex
      };

      localStorage.setItem(`todo-${todoIndex.toString()}`, JSON.stringify(todoData));
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
    /* what this do, exactly? well, it gets the data created with the forms 
       and return as a object*/

    let title, priority, description, date, checkbox;
    const obj = {};

    title = JSON.parse(localStorage.getItem(`todo-title-${index}`));
    priority = JSON.parse(localStorage.getItem(`todo-priority-${index}`));
    description = JSON.parse(
      localStorage.getItem(`todo-description-button-${index}`)
    );
    date = JSON.parse(localStorage.getItem(`todo-date-${index}`));
    checkbox = JSON.parse(localStorage.getItem(`todo-checkbox-${index}`));

    // obj.push(title, priority, description, date, checkbox);

    obj["title"] = title;
    obj["priority"] = priority;
    obj["description"] = description;
    obj["date"] = date;
    obj["checkbox"] = checkbox;

    return obj;
  }

  return { getFormsData, setFormsData, storeInfo, sendToDoInfo };
})();
