const leftPanel = document.querySelector(".left-panel");
const mobileNavBtn = document.querySelector(".mobile-nav-btn");

mobileNavBtn.addEventListener("click", toggleMobileNav);

function toggleMobileNav() {
  const visibility = leftPanel.getAttribute("mobile-visible");
  console.log(visibility);

  if (visibility === "false") {
    leftPanel.setAttribute("mobile-visible", "true");
    mobileNavBtn.setAttribute("aria-expanded", "true");
  } else if (visibility === "true") {
    leftPanel.setAttribute("mobile-visible", "false");
    mobileNavBtn.setAttribute("aria-expanded", "false");
  }
}

export { toggleMobileNav };
