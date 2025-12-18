// just to avoid reference error
// this variable is about the dropdown
const optionsWithListener = new WeakSet();

// this is for indexing
let todoIndex = 1, projectIndex = 1;

function addTodoIndex() {
    todoIndex += 1;
}

function addProjectIndex() {
    projectIndex += 1;
}

export { optionsWithListener, todoIndex, projectIndex, addTodoIndex, addProjectIndex };