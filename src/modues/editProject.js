import { projectsData } from "..";
import { formAddProject } from "./ui_dom";

const localProjectStorageKey = "projects";

// Load projects from local storage on page load
const loadProjectsFromLocalStorage = function () {
  const projectsFromLocalStorage = localStorage.getItem(localProjectStorageKey);
  if (projectsFromLocalStorage) {
    projectsData.projectsArr = JSON.parse(projectsFromLocalStorage);
  }
};

const updateProjectsLocalStorage = function () {
  localStorage.setItem(
    localProjectStorageKey,
    JSON.stringify(projectsData.projectsArr)
  );
};

const addProject = function (e) {
  e.preventDefault();
  // Object constructor for form
  let formData = new FormData(formAddProject);
  // output as an object and push into tasks array
  let formObj = Object.fromEntries(formData);
  projectsData.projectsArr.push(formObj);
  // Updates local storage
  updateProjectsLocalStorage();
};

const deleteProject = function (i) {
  projectsData.projectsArr.splice(i, 1);
  updateProjectsLocalStorage();
};

const renameProject = function (i, newName) {
  projectsData.projectsArr[i].name = newName;
  updateProjectsLocalStorage();
};

export {
  addProject,
  deleteProject,
  renameProject,
  loadProjectsFromLocalStorage,
};
