import { todoIndex } from "./UI.js";

import { format, parseISO } from "date-fns";

import { DOMStuff } from "./UI.js";

export const dataStuff = (() => {
  let allFormsData, formsData;

  let projectIndex = 1;

  // should change this arguments
  function setFormsData({ forms = {}, projectIndex = undefined } = {}) {
    // Kinda of a bad name, but I don't have any other ideias at the moment
    allFormsData = new FormData(forms);

    formsData = Object.fromEntries(allFormsData.entries());
    formsData["index"] = todoIndex;
    let todoDueDate = parseISO(formsData["todo-due-date"]);
    formsData["todo-due-date"] = todoDueDate;

    localStorage.setItem(`forms-index-${todoIndex}`, JSON.stringify(formsData));
  }

  // This shoud change the data store in the getFormsData, how I still don't know
  function editFormsData({
    forms = {},
    todoIndex = undefined,
  }) {
    
  }

  // I change the order, the get is setting and the set is getting. DAAAAMMMMMMM
  function getFormsData({ forms = {}, index = undefined } = {}) {
    // Terrible names, but no other ideas at the moment
    let allFormsData;
    let theFormsData;

    if (Object.keys(forms).length !== 0) {
      allFormsData = new FormData(forms);
      theFormsData = Object.fromEntries(allFormsData.entries());
    } else if (index !== undefined) {
      theFormsData = JSON.parse(localStorage.getItem(`forms-index-${index}`));
    }

    return theFormsData;
  }

  function storeInfo({
    /* add the todo or project directly from the DOM, won't work otherwise */

    obj = {},
    todoIndex = undefined,
    projectIndex = undefined,
  } = {}) {
    if (obj === null) {
      return;
    }

    // If it's a todo
    if (obj["todo-title"] != undefined) {
      // it's relevant that I save this not for the edit forms, but for the 'ToDo' stay the same when the page reload
      // wich still isn't happening

      const teste = obj["todo-due-date"];
      teste;

      const todoData = {
        priority: obj["todo-priority"],
        checked: false,
        description: obj["todo-description"],
        title: obj["todo-title"],
        date: format(obj["todo-due-date"], "dd/MM/yy"),
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
    /* what this do, exactly? well, it gets the data stored in localStorage 
     and return as object, and why do I need this? */

    const obj = {
      index: index,
      title: JSON.parse(localStorage.getItem(`todo-title-${index}`)),
      priority: JSON.parse(localStorage.getItem(`todo-priority-${index}`)),
      /* description: JSON.parse(
        localStorage.getItem(`todo-description-button-${index}`)
      ), */
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
    //relatively unsafe, but ok for now
    let todoInfo = JSON.parse(localStorage.getItem(`todo-${index}`));

    // from here I should change the data from the todo and call somthing from the UI
    // to change the todo as well in the page

    todoInfo[`title`] = newTodoInfo[`todo-title`];
    todoInfo[`priority`] = newTodoInfo[`todo-priority`];
    todoInfo[`date`] = newTodoInfo[`todo-due-date`];
    todoInfo[`description`] = newTodoInfo[`todo-description`];

    localStorage.setItem(`todo-${index}`, JSON.stringify(todoInfo));

    DOMStuff.editToDo(index, newTodoInfo);
  }

  return {
    getFormsData,
    setFormsData,
    storeInfo,
    sendToDoInfo,
    editFormsData,
    editToDoInfo,
  };
})();
