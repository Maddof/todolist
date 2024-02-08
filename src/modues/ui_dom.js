import { taskData, projectsArr } from "..";
import {
  editPrio,
  deleteTask,
  addTask,
  countTasks,
  renameTaskProject,
  deleteTasksByProject,
} from "./editTask";
import { addProject, deleteProject, renameProject } from "./editProject";
import { isToday } from "date-fns";

const tasksWrapper = document.querySelector(".tasks");
const formAddTask = document.querySelector(".addtask-form");
const formAddProject = document.querySelector(".addproject-form");
const projectsWrapper = document.querySelector(".projects");
const projectsSelection = document.getElementById("project-selection");
const tasksFilterWrapper = document.querySelector(".tasks-filter");

let viewTitleHeading = document.querySelector(".currentview-title");

tasksWrapper.addEventListener("click", editPrio);
tasksWrapper.addEventListener("click", deleteTask);
formAddTask.addEventListener("submit", addTask);
formAddProject.addEventListener("submit", addProject);

tasksFilterWrapper.addEventListener("click", clickToRenderFilter);

function clickToRenderFilter(e) {
  const currentClickVal = e.target.textContent;
  switch (currentClickVal) {
    case "All Tasks":
      renderTasks();
      break;
    case "Important":
      renderTasksByPriority(currentClickVal);
      break;
    case "Today":
      renderTodaysTasks(currentClickVal);
      break;
  }
}

function renderTodaysTasks(val) {
  tasksWrapper.innerHTML = "";
  setCurrentView(val);
  taskData.tasksArr.forEach((task, i) => {
    // Checking that task priority is set to important and only rendering important tasks.
    if (isToday(task.date)) {
      const htmlTask = `
        <li class ="task-item" index="${i}">
            <div>${task.title}</div>
            <div>${task.description}</div>
            <div>${task.project}</div>
            <div>${task.date}</div>
            <div><button class="priority" index="${i}" value="${task.priority}">${task.priority}</button></div>
            <div><button class="delete" index="${i}">Delete</button></div>
        </li>
    `;
      tasksWrapper.insertAdjacentHTML("beforeend", htmlTask);
    }
  });
}

const renderProjectSelections = function () {
  projectsSelection.innerHTML = "";
  projectsArr.forEach((project) => {
    const htmlProjectSelection = `
      <option value="${project.name}">${project.name}</option>
    `;
    projectsSelection.insertAdjacentHTML("beforeend", htmlProjectSelection);
  });
};

const renderTasksByPriority = function (important) {
  tasksWrapper.innerHTML = "";
  setCurrentView(important);
  taskData.tasksArr.forEach((task, i) => {
    // Checking that task priority is set to important and only rendering important tasks.
    if (task.priority === important) {
      const htmlTask = renderTasksHtml(task, i);
      tasksWrapper.insertAdjacentHTML("beforeend", htmlTask);
    }
  });
};

const renderTaskByProject = function (projectName) {
  tasksWrapper.innerHTML = "";
  setCurrentSelection(projectName);
  taskData.tasksArr.forEach((task, i) => {
    // Checking that task project title is equal to current project name.
    if (task.project === projectName) {
      const htmlTask = renderTasksHtml(task, i);
      tasksWrapper.insertAdjacentHTML("beforeend", htmlTask);
    }
  });
};

projectsWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("project-btn")) {
    renderTaskByProject(e.target.value);
    setCurrentView(e.target.value);
  }
});

const setCurrentView = function (val) {
  viewTitleHeading.textContent = val || "My tasks";
};

const renderTasks = function () {
  tasksWrapper.innerHTML = "";
  setCurrentView();
  taskData.tasksArr.forEach((task, i) => {
    const htmlTask = renderTasksHtml(task, i);
    tasksWrapper.insertAdjacentHTML("beforeend", htmlTask);
  });
};

function setCurrentSelection(projectName) {
  const childrenEles = projectsSelection.children;
  const currentView = projectName;
  [...childrenEles].forEach((option) => {
    option.value === currentView
      ? option.setAttribute("selected", "")
      : option.removeAttribute("selected", "");
  });
}

const renderProjects = function () {
  projectsWrapper.innerHTML = "";
  projectsArr.forEach((project, i) => {
    const htmlProject = `
      <li class="project-item">
        <button class="project-btn" index="${i}" value="${project.name}">
        ${project.name} 
        <span class="project-task-count-info">
        (${countTasks(project.name)})
        </span></button>
        <button class="project-edit-btn" index="${i}" value="${project.name}">
        Edit
        </button>
        </li>
    `;
    projectsWrapper.insertAdjacentHTML("beforeend", htmlProject);
  });
};

/* Accordion logic for add project button in left panel */

const addProjectBtn = document.querySelector(".addproject-btn");
const addProjectWrapper = document.querySelector(".addproject-wrapper");

addProjectBtn.addEventListener("click", () => {
  addProjectBtn.classList.toggle("active");
  if (addProjectBtn.classList.contains("active")) {
    addProjectWrapper.style.maxHeight = addProjectWrapper.scrollHeight + "px";
  } else {
    addProjectWrapper.style.maxHeight = 0;
  }
});

/* Accordion logic for add task button in right panel */

const addTaskBtn = document.getElementById("add-task-btn");
const formTaskWrapper = document.querySelector(".task-form-wrapper");

addTaskBtn.addEventListener("click", () => {
  addTaskBtn.classList.toggle("active");
  if (addTaskBtn.classList.contains("active")) {
    formTaskWrapper.style.maxHeight = formTaskWrapper.scrollHeight + "px";
  } else {
    formTaskWrapper.style.maxHeight = 0;
  }
});

// const projectEditBtn = document.querySelectorAll(".project-edit-btn");
const dialogCloseBtn = document.getElementById("close-modal-btn");
const projectDialog = document.getElementById("project-dialog");
const dialogTitle = document.getElementById("dialog-title");
const deleteProjectModalBtn = document.getElementById("delete-project-btn");
const inputRename = document.getElementById("rename");
const submitRename = document.getElementById("rename-submit");
const dialogMsg = document.getElementById("dialog-messages");

submitRename.addEventListener("click", renameProjectName);

function renameProjectName() {
  const newName = inputRename.value;
  const oldName = dialogTitle.textContent;
  const matchProject = (element) => element.name === dialogTitle.textContent;
  const projectIndex = projectsArr.findIndex(matchProject);
  if (inputRename.value.length < 3) {
    dialogMsg.textContent = "Please specify a longer name";
  }
  if (projectsArr[projectIndex] === undefined) {
    dialogMsg.textContent = "SHIIET ALREADY DELETED";
  } else {
    renameProject(projectIndex, newName);
    renameTaskProject(oldName, newName);
    dialogMsg.textContent = `Renamed to: ${newName}`;
    dialogTitle.textContent = newName;
    inputRename.value = "";
    renderProjects();
    renderProjectSelections();
  }
}

projectsWrapper.addEventListener("click", displayProjectDialog);

deleteProjectModalBtn.addEventListener("click", projectDelete);

function displayProjectDialog(e) {
  dialogMsg.textContent = "";
  if (e.target.classList.contains("project-edit-btn")) {
    setDialogProjectHtml(e);
    projectDialog.showModal();
  }
}

function projectDelete() {
  const matchProject = (element) => element.name === dialogTitle.textContent;
  const projectIndex = projectsArr.findIndex(matchProject);
  if (projectIndex === -1) {
    deleteProjectModalBtn.textContent = "Already deleted";
  } else {
    deleteProject(projectIndex);
    deleteProjectModalBtn.textContent = "Deleted";
    renderProjects();
    renderProjectSelections();
    deleteAllTasks();
  }
}

function deleteAllTasks() {
  const deleteAllTasksBtn = document.createElement("button");
  deleteAllTasksBtn.textContent = "Delete all tasks in this project?";
  dialogMsg.appendChild(deleteAllTasksBtn);

  deleteAllTasksBtn.addEventListener("click", () => {
    console.log("clicky micky");
    deleteTasksByProject(dialogTitle.textContent);
    renderTasks();
  });
}

function setDialogProjectHtml(e) {
  dialogTitle.textContent = e.target.value;
  deleteProjectModalBtn.setAttribute("value", dialogTitle.textContent);
}

// Form cancel button closes the dialog box
dialogCloseBtn.addEventListener("click", () => {
  projectDialog.close();
});

// Helper function for checking the current view and rendering based on view.
function renderViewChecker() {
  const currentView = viewTitleHeading.textContent;
  if (currentView === "Important") {
    renderTasksByPriority(currentView);
    return;
  }
  if (currentView === "Today") {
    renderTodaysTasks(currentView);
    return;
  }
  if (currentView != "My tasks") {
    renderTaskByProject(currentView);
  } else {
    renderProjects();
    renderTasks();
  }
}

// Helper function for rendering tasks html

function renderTasksHtml(task, i) {
  const htmlTask = `
  <li class ="task-item" index="${i}">
  <div>${task.title}</div>
  <div>${task.description}</div>
  <div>${task.project}</div>
  <div>${task.date}</div>
  <div><button class="priority" index="${i}" value="${task.priority}">${task.priority}</button></div>
  <div><button class="delete" index="${i}">Delete</button></div>
</li>
`;
  return htmlTask;
}

export {
  renderTasks,
  renderProjects,
  renderProjectSelections,
  renderViewChecker,
  formAddTask,
  formAddProject,
  viewTitleHeading,
};