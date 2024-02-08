import { renderTasks, renderProjects } from "./modues/ui_dom";
import "./style.css";

export const taskData = {
  tasksArr: [
    {
      title: "Go shop",
      description: "Shopping groceries, apples and tomatoes",
      priority: "Important",
      project: "Default",
      date: "2024-02-06",
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
      date: "2024-02-04",
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

export let projectsArr = [
  {
    name: "Default",
  },
  {
    name: "Math exam",
  },
];

class Task {}

// export const deleteAllTasksProject = function (projectName) {
//   // Remove all tasks associated with the specified project
//   tasksArr = tasksArr.filter((task) => task.project !== projectName);

//   // After removing tasks associated with the project, you might want to update the UI to reflect the changes
//   renderTasks(); // Assuming you have a function to render the tasks
// };

renderTasks();
renderProjects();
