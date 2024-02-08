import { projectsArr } from "..";
import {
  renderProjects,
  renderProjectSelections,
  formAddProject,
} from "./ui_dom";

const addProject = function (e) {
  e.preventDefault();
  // Object constructor for form
  let formData = new FormData(formAddProject);
  // output as an object and push into tasks array
  projectsArr.push(Object.fromEntries(formData));
  // clear inputs and render dom
  formAddProject.reset();
  renderProjects();
  renderProjectSelections();
};

const deleteProject = function (i) {
  projectsArr.splice(i, 1);
};

const renameProject = function (i, newName) {
  projectsArr[i].name = newName;
};

export { addProject, deleteProject, renameProject };
