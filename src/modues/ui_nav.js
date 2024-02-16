import {
  renderTasks,
  renderNextWeekTasks,
  renderTodaysTasks,
  renderTasksByPriority,
  setCurrentView,
  renderTaskByProject,
  projectsWrapper,
} from "./ui_dom";

const leftPanel = document.querySelector(".left-panel");
const mobileNavBtn = document.querySelector(".mobile-nav-btn");
const tasksFilterWrapper = document.querySelector(".tasks-filter");
const addProjectBtn = document.querySelector(".addproject-btn");
const addProjectWrapper = document.querySelector(".addproject-wrapper");

mobileNavBtn.addEventListener("click", toggleNavAttribute);

// Left panel menu for filterings tasks by All, Next 7, Important or Today

tasksFilterWrapper.addEventListener("click", clickToRenderFilter);

function clickToRenderFilter(e) {
  const currentClickVal = e.target.childNodes[0].textContent.trim();
  console.log(currentClickVal);
  switch (currentClickVal) {
    case "All Tasks":
      toggleNavAttribute();
      renderTasks();
      break;
    case "Next 7 days":
      toggleNavAttribute();
      renderNextWeekTasks(currentClickVal);
      break;
    case "Important":
      toggleNavAttribute();
      renderTasksByPriority(currentClickVal);
      break;
    case "Today":
      toggleNavAttribute();
      renderTodaysTasks(currentClickVal);
      break;
  }
}

// Left panel menu for filtering tasks by project

projectsWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("project-btn")) {
    toggleNavAttribute();
    renderTaskByProject(e.target.value);
    setCurrentView(e.target.value);
  }
});

/* Accordion logic for add project button in left panel */

addProjectBtn.addEventListener("click", () => {
  addProjectBtn.classList.toggle("active");
  if (addProjectBtn.classList.contains("active")) {
    addProjectWrapper.style.maxHeight = addProjectWrapper.scrollHeight + "px";
  } else {
    addProjectWrapper.style.maxHeight = 0;
  }
});

// Helper function for toggling attributes on mobile nav

function toggleNavAttribute() {
  const visibility = leftPanel.getAttribute("mobile-visible");
  if (visibility === "false") {
    leftPanel.setAttribute("mobile-visible", "true");
    mobileNavBtn.setAttribute("aria-expanded", "true");
  } else if (visibility === "true") {
    leftPanel.setAttribute("mobile-visible", "false");
    mobileNavBtn.setAttribute("aria-expanded", "false");
  }
}
