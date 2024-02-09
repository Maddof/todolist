import { renderTasks, renderProjects } from "./modues/ui_dom";
import "./style.css";

export const taskData = {
  tasksArr: [
    {
      title: "Go shop",
      description: "Shopping groceries, apples and tomatoes",
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
    {
      title: "Study",
      description: "Chapter 9 of math book",
      priority: "Important",
      project: "Math exam",
      date: "2024-02-03",
    },
    {
      title: "Research",
      description: "Alghoritms after class",
      priority: "Not important",
      project: "Math exam",
      date: "2024-02-02",
    },
  ],
};

export let projectsData = {
  projectsArr: [
    {
      name: "Default",
    },
    {
      name: "Math exam",
    },
  ],
};

class Task {}

renderTasks();
renderProjects();
