import { taskData } from "..";
import { formAddTask, renderProjects, renderViewChecker } from "./ui_dom";

const editPrio = function (e) {
  if (e.target.classList.contains("priority")) {
    const btnIndex = getBtnIndex(e);
    if (taskData.tasksArr[btnIndex].priority === "Not important") {
      taskData.tasksArr[btnIndex].priority = "Important";
    } else {
      taskData.tasksArr[btnIndex].priority = "Not important";
    }
  }
  renderViewChecker();
};

const addTask = function (e) {
  e.preventDefault();
  // Object constructor for form
  let formData = new FormData(formAddTask);
  // output as an object and push into tasks array
  taskData.tasksArr.push(Object.fromEntries(formData));
  // clear inputs and render dom
  formAddTask.reset();
  renderViewChecker();
  renderProjects();
};

const renameTaskProject = function (oldName, newName) {
  taskData.tasksArr.forEach((task) => {
    if (task.project === oldName) {
      task.project = newName;
    }
  });
};

const deleteTask = function (e) {
  if (e.target.classList.contains("delete")) {
    const btnIndex = getBtnIndex(e);
    taskData.tasksArr.splice(btnIndex, 1);
    renderProjects();
  }
  renderViewChecker();
};

const deleteTasksByProject = function (projectName) {
  // Remove all tasks associated with the specified project
  taskData.tasksArr = taskData.tasksArr.filter(
    (task) => task.project !== projectName
  );
};

// Helper function for getting the current button index.
function getBtnIndex(e) {
  return e.target.attributes.index.value;
}

// Helper function for counting tasks
function countTasks(input) {
  let total = 0;
  let defaultTotal = 0;
  for (let i = 0; i < taskData.tasksArr.length; i++) {
    total++;
    if (taskData.tasksArr[i].project === input) {
      defaultTotal++;
    }
  }
  return defaultTotal;
}

export {
  editPrio,
  deleteTask,
  addTask,
  countTasks,
  renameTaskProject,
  deleteTasksByProject,
};
