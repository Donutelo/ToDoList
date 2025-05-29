export const dataStuff = (() => {
  let allFormsData, formsData;

  function getFormsData(forms) {
    // Kinda of a bad name, but I don't have any other ideias at the moment
    allFormsData = new FormData(forms);
    formsData = {};

    formsData = Object.fromEntries(allFormsData.entries());
  }

  function setFormsData() {
    return formsData;
  }

  function populateSection(obj) {
    // If it's a todo
    if (obj["todo-title"]){
      localStorage.setItem("todo-priority", obj.querySelector(".todo-priority"));
      localStorage.setItem("todo-checkbox", obj.querySelector(".todo-checkbox"));
      localStorage.setItem("todo-description-button", obj.querySelector(".todo-description-button"));
      localStorage.setItem("todo-title", obj.querySelector(".todo-title"));
      localStorage.setItem("todo-date", obj.querySelector(".todo-date"));

      setInfo(obj);
    }

    //if it's a project
    else if (obj["project-title"]){

    }
  }

  function setInfo(obj) {
    
  }

  return { getFormsData, setFormsData, populateSection };
})();
