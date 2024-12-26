import sunset from "../assets/landing-background.jpg";
import logo from "../assets/logo.png";
import searchIcon from "../assets/search-icon.svg";
import { userSearch, getUserCoordinates, getUserWeather } from "./geolocation";

const content = document.getElementById("content");

function renderLandingBackground() {
  const bgIMG = document.createElement("img");
  bgIMG.src = sunset;
  bgIMG.id = "landing-bg";
  bgIMG.classList.add("background");
  bgIMG.alt = "Cloudy sky at sunset";

  content.appendChild(bgIMG);

  const bgCredit = document.createElement("p");
  bgCredit.innerHTML = `Photo by <a href="https://unsplash.com/@noaa">NOAA</a> from <a href="https://unsplash.com/photos/wind-blown-cloud-tops-in-the-setting-sun-SLDSYepv0n8">Unsplash</a>`;
  bgCredit.id = "landing-bg-credit";
  content.appendChild(bgCredit);
}

function renderLandingPage() {
  const landingMain = document.createElement("div");
  landingMain.id = "landing-main";
  content.appendChild(landingMain);

  // Add logo
  const logoIMG = document.createElement("img");
  logoIMG.id = "landing-logo";
  logoIMG.src = logo;
  logoIMG.alt = "Logo of sun behind rain clouds";
  landingMain.appendChild(logoIMG);

  // Add search bar
  const form = document.createElement("form");
  landingMain.appendChild(form);

  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");
  form.appendChild(searchContainer);

  const searchBar = document.createElement("input");
  searchBar.type = "text";
  searchBar.id = "landing-search-bar";
  searchBar.classList.add("search-bar");
  searchBar.classList.add("landing-search");
  searchBar.name = "landing-search-bar";
  searchBar.placeholder = "Search for a city or zip code";
  searchContainer.appendChild(searchBar);

  const searchButton = document.createElement("button");
  searchButton.type = "submit";
  searchButton.id = "landing-search-btn";
  searchButton.classList.add("search-btn");
  searchButton.innerHTML = `<img src=${searchIcon} alt="Search Icon">`;
  searchContainer.appendChild(searchButton);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    userSearch.city = searchBar.value;
    form.reset();
    getUserWeather(userSearch.city);
  })

  const currentLocation = document.createElement("button");
  currentLocation.id = "current-location-button";
  currentLocation.textContent = "Use current location";
  landingMain.appendChild(currentLocation);

  currentLocation.addEventListener("click", (e) => {
    e.stopPropagation();
    getUserCoordinates();
  });
}

export function initializeLandingPage() {
  // Reset Page
  document.body.style.overflowY = "hidden";
  const header = document.getElementById("header");
  header.style.display = "none";
  content.innerHTML = "";
  content.padding = "0px";

  renderLandingBackground();
  renderLandingPage();
}

initializeLandingPage();
