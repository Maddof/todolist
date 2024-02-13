import { taskData } from "..";
import { formAddTask, renderProjects, renderViewChecker } from "./ui_dom";
import { isToday, isWithinInterval, addDays } from "date-fns";
import { renderTasksCountLeftPanel } from "./ui_tasks-count";

const localTasksStorageKey = "tasks";

// Load tasks from local storage on page load
const loadTasksFromLocalStorage = function () {
  const tasksFromLocalStorage = localStorage.getItem(localTasksStorageKey);
  if (tasksFromLocalStorage) {
    taskData.tasksArr = JSON.parse(tasksFromLocalStorage);
  }
};

const updateTasksLocalStorage = function () {
  localStorage.setItem(localTasksStorageKey, JSON.stringify(taskData.tasksArr));
};

const editPrio = function (e) {
  if (e.target.classList.contains("priority")) {
    const btnIndex = getBtnIndex(e);
    if (taskData.tasksArr[btnIndex].priority === "Not important") {
      taskData.tasksArr[btnIndex].priority = "Important";
    } else {
      taskData.tasksArr[btnIndex].priority = "Not important";
    }
    renderViewChecker();
    updateTasksLocalStorage();
  }
};

const addTask = function (e) {
  e.preventDefault();
  // Object constructor for form
  let formData = new FormData(formAddTask);
  // output as an object and push into tasks array
  let formObj = Object.fromEntries(formData);
  taskData.tasksArr.push(formObj);

  updateTasksLocalStorage();
};

const renameTaskProject = function (oldName, newName) {
  taskData.tasksArr.forEach((task) => {
    if (task.project === oldName) {
      task.project = newName;
    }
  });
  updateTasksLocalStorage();
};

const deleteTask = function (e) {
  if (e.target.classList.contains("delete")) {
    const btnIndex = getBtnIndex(e);
    taskData.tasksArr.splice(btnIndex, 1);
    renderProjects();
    renderTasksCountLeftPanel();
    renderViewChecker();
  }
  updateTasksLocalStorage();
};

const deleteTasksByProject = function (projectName) {
  // Remove all tasks associated with the specified project
  taskData.tasksArr = taskData.tasksArr.filter(
    (task) => task.project !== projectName
  );
  updateTasksLocalStorage();
};

// Helper function for getting the current button index.
function getBtnIndex(e) {
  return e.target.attributes.index.value;
}

// Helper function for counting tasks
function countTasksInProject(input) {
  let tasksInProject = 0;
  for (let i = 0; i < taskData.tasksArr.length; i++) {
    if (taskData.tasksArr[i].project === input) {
      tasksInProject++;
    }
  }
  return tasksInProject;
}

function countAllTasks() {
  let totalTasks = 0;
  for (let i = 0; i < taskData.tasksArr.length; i++) {
    totalTasks++;
  }
  return totalTasks;
}

function countTodayTasks() {
  let todayTasks = 0;
  taskData.tasksArr.forEach((task, i) => {
    if (isToday(task.date)) {
      todayTasks++;
    }
  });
  return todayTasks;
}

function countNextWeekTasks() {
  const today = new Date();
  const nextWeek = addDays(today, 7);
  let totalNextWeekTasks = 0;
  taskData.tasksArr.forEach((task, i) => {
    // Checking that the task is within 7 days.
    if (
      isWithinInterval(task.date, {
        start: today,
        end: nextWeek,
      })
    )
      totalNextWeekTasks++;
  });
  return totalNextWeekTasks;
}

function countImportantTasks() {
  let totalImportantTasks = 0;
  taskData.tasksArr.forEach((task, i) => {
    // Checking that task priority is set to important and only rendering important tasks.
    if (task.priority === "Important") {
      totalImportantTasks++;
    }
  });
  return totalImportantTasks;
}

export {
  editPrio,
  deleteTask,
  addTask,
  countTasksInProject,
  countAllTasks,
  countTodayTasks,
  countNextWeekTasks,
  countImportantTasks,
  renameTaskProject,
  deleteTasksByProject,
  loadTasksFromLocalStorage,
};
