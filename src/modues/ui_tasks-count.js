import {
  countAllTasks,
  countTodayTasks,
  countImportantTasks,
  countNextWeekTasks,
} from "./editTask";

const allTasksAmount = document.getElementById("all-tasks-amount");
const todayTasksAmount = document.getElementById("today-tasks-amount");
const countNext7DaysTasks = document.getElementById("next7days-tasks-amount");
const countImportTasks = document.getElementById("important-tasks-amount");

function countAllTasksDisplay() {
  allTasksAmount.textContent = `(${countAllTasks()})`;
}

function countNext7DaysTasksDisplay() {
  countNext7DaysTasks.textContent = `(${countNextWeekTasks()})`;
}

function countImportantTasksDisplay() {
  countImportTasks.textContent = `(${countImportantTasks()})`;
}

function countTodayTasksDisplay() {
  todayTasksAmount.textContent = `(${countTodayTasks()})`;
}

export function renderTasksCountLeftPanel() {
  countAllTasksDisplay();
  countNext7DaysTasksDisplay();
  countImportantTasksDisplay();
  countTodayTasksDisplay();
}
