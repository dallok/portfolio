"use strict";

// Make navbar transparent when it is on the top

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView();
}

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");

navbarMenu.addEventListener("click", event => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }

  scrollIntoView(link);
});

// Handle scrolling when clicking Contact button
const contactBtn = document.querySelector(".home__contact");

contactBtn.addEventListener("click", event => scrollIntoView("#contact"));

// Fading out the home dashboard scrolling down
const homeDash = document.querySelector(".home__container");
const homeHeight = homeDash.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  homeDash.style.opacity = 1 - window.scrollY / homeHeight;
});

// Arrow-up button show when scrolling down
const arrowBtn = document.querySelector(".arrow-up");

document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowBtn.classList.add("visible");
  } else {
    arrowBtn.classList.remove("visible");
  }
});

arrowBtn.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".workgit__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", e => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  projectContainer.classList.add("anime-out")
  

  setTimeout(() => {
    projects.forEach(project => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anime-out")
  }, 300)
});
