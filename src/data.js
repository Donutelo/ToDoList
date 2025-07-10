import { todoIndex } from "./UI.js";

export const dataStuff = (() => {
  let allFormsData, formsData;

  let projectIndex = 1;

  // should change this arguments
  function getFormsData({ forms = {}, projectIndex = undefined} = {}) {
    // Kinda of a bad name, but I don't have any other ideias at the moment
    allFormsData = new FormData(forms);
    formsData = {};

    formsData = Object.fromEntries(allFormsData.entries());
    formsData["index"] = todoIndex;

    localStorage.setItem(
      `forms-index-${todoIndex.toString()}`,
      JSON.stringify(formsData)
    );
  }

  function editFormsData ({forms = {}, specifTodoIndex = undefined, projectIndex = {}}) {
    
  }

  function setFormsData(index) {
    let theFormsData = localStorage.getItem(`forms-index-${index.toString()}`);
    theFormsData = JSON.parse(theFormsData);

    return theFormsData;
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
      // it's relevant that I save this not for the edit forms, but for the 'ToDo' stay the same when the page reload

      const todoData = {
        priority: obj.querySelector(`[class^="todo-priority-"]`).textContent,
        checked: obj.querySelector(".todo-checkbox").checked,
        description: obj
          .querySelector(".todo-description-button")
          .querySelector("img"),
        title: obj.querySelector(".todo-title").textContent,
        date: obj.querySelector(".todo-date").value,
        index: todoIndex,
      };

      localStorage.setItem(
        `todo-${todoIndex.toString()}`,
        JSON.stringify(todoData)
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
    /* what this do, exactly? well, it gets the data created with the forms 
       and return as a object*/

    const obj = {
      index: index,
      title: JSON.parse(localStorage.getItem(`todo-title-${index}`)),
      priority: JSON.parse(localStorage.getItem(`todo-priority-${index}`)),
      description: JSON.parse(
        localStorage.getItem(`todo-description-button-${index}`)
      ),
      date: JSON.parse(localStorage.getItem(`todo-date-${index}`)),
      checkbox: JSON.parse(localStorage.getItem(`todo-checkbox-${index}`)),
    };

    // i made the stupid way
    /*
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
    */

    return obj;
  }

  function editToDoInfo(index, newTodoInfo) {
    let todoInfo = localStorage.getItem(`todo-${index.toString()}`);

    todoInfo = JSON.parse(todoInfo);
  }

  return { getFormsData, setFormsData, storeInfo, sendToDoInfo, editFormsData };
})();
