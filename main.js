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

// Filtering projects by clicking button
// Fetch the items form data.json
function loadItems() {
  return fetch("data\data.json")
    .then(response => response.json())
    .then(json => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".work__projects");
  container.innerHTML = items.map(item => createHTMLString(item).join(""));
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
  <a href="${item.link}" class="project" target="blank">
    <img src="${item.image}" alt="${item.imgAlt}" class="project__img" />
    <div class="project__description">
      <h3>${item.title}</h3>
      <span>${item.description}</span>
    </div>
  </a>
  `;
}

// 2. click event
// Filtering items by clicking a button
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }
  const filtered = items.filter(item => item[key] === value);
  displayItems(filtered);
}

function setEventListener(items) {
  const allBtn = document.querySelector("#allBtn");
  const buttons = document.querySelector(".category__btn:not(:nth-child(1)");
  allBtn.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", event => onButtonClick(event, items));
}

// main
loadItems()
  .then(items => {
    displayItems(items);
    setEventListener(items);
  })
  .catch(console.log);
