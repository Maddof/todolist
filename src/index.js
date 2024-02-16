import {
  renderTasks,
  renderProjects,
  renderProjectSelections,
  setDatePickerToday,
} from "./modues/ui_dom";
import { loadProjectsFromLocalStorage } from "./modues/editProject";
import { loadTasksFromLocalStorage } from "./modues/editTask";
import { renderTasksCountLeftPanel } from "./modues/ui_tasks-count";
import "./style.css";
import "./mnav.css";

export const taskData = {
  tasksArr: [
    {
      title: "A test task",
      description: "You can delete these tasks anytime you like",
      priority: "Important",
      project: "Default",
      date: "2024-02-09",
    },
    {
      title: "Doctor appointment",
      description: "Take 09.00AM bus",
      priority: "Not important",
      project: "Default",
      date: "2024-02-08",
    },
    {
      title: "Random title",
      description: "Just do it.",
      priority: "Not important",
      project: "Default",
      date: "2024-02-10",
    },
  ],
};

export let projectsData = {
  projectsArr: [
    {
      name: "Default",
    },
  ],
};

// Initalizing page on load

loadProjectsFromLocalStorage();
loadTasksFromLocalStorage();
renderTasks();
renderProjects();
renderProjectSelections();
renderTasksCountLeftPanel();
setDatePickerToday();
