import logo from "../assets/logo.png";
import searchIcon from "../assets/search-icon.svg";
import { initializeLandingPage } from "./landing-page";
import { userSearch, weatherReport, getUserWeather } from "./geolocation";
import { format } from "date-fns";
import thunderIcon from "../assets/thunder.svg";
import rainyIcon from "../assets/rainy.svg";
import snowyIcon from "../assets/snowy.svg";
import sunnyIcon from "../assets/sunny.svg";
import clearNight from "../assets/clear-night.svg";
import cloudyIcon from "../assets/cloudy.svg";
import partlySunnyIcon from "../assets/partly-cloudy.svg";
import partlyCloudyNightIcon from "../assets/partly-cloudy-night.svg";

const weatherIcon = {
  "partly-cloudy-day": partlySunnyIcon,
  "partly-cloudy-night": partlyCloudyNightIcon,
  rain: rainyIcon,
  snow: snowyIcon,
  "clear-day": sunnyIcon,
  "clear-night": clearNight,
  cloudy: cloudyIcon,
};

let weatherReportCity;

const content = document.getElementById("content");

function renderHeader() {
  const header = document.getElementById("header");
  header.innerHTML = "";
  header.style.display = "flex";

  const logoIMG = document.createElement("img");
  logoIMG.id = "header-logo";
  logoIMG.src = logo;
  logoIMG.alt = "Logo of sun behind rain clouds";
  header.appendChild(logoIMG);

  logoIMG.addEventListener("click", (e) => {
    e.stopPropagation();
    initializeLandingPage();
  });

  const searchContainer = document.createElement("form");
  searchContainer.classList.add("search-container");
  header.appendChild(searchContainer);

  const searchBar = document.createElement("input");
  searchBar.type = "text";
  searchBar.id = "header-search-bar";
  searchBar.classList.add("search-bar");
  searchBar.classList.add("landing-search");
  searchBar.name = "header-search-bar";
  searchBar.placeholder = "Search for a city or zip code";
  searchContainer.appendChild(searchBar);

  const searchButton = document.createElement("button");
  searchButton.type = "submit";
  searchButton.id = "header-search-btn";
  searchButton.classList.add("search-btn");
  searchButton.classList.add("landing-search");
  searchButton.innerHTML = `<img src=${searchIcon} alt="Search Icon">`;
  searchContainer.appendChild(searchButton);

  searchContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    userSearch.city = searchBar.value;
    searchContainer.reset();
    getUserWeather(userSearch.city);
  });
}

function renderSnapshot() {
  const snapshot = document.createElement("div");
  snapshot.id = "snapshot";
  document.getElementById("display-page").appendChild(snapshot);

  const cityName = document.createElement("h1");
  cityName.id = "cityName";
  cityName.textContent = weatherReportCity;
  snapshot.appendChild(cityName);

  const snapshotLeft = document.createElement("div");
  snapshotLeft.id = "snapshot-left";
  snapshot.appendChild(snapshotLeft);

  const icon = weatherReport.report.currentConditions.icon;
  const snapshotIcon = document.createElement("img");
  snapshotIcon.id = "snapshot-icon";
  snapshotIcon.src = weatherIcon[icon];
  snapshotLeft.appendChild(snapshotIcon);

  const leftInfo = document.createElement("div");
  leftInfo.id = "left-info";
  snapshotLeft.appendChild(leftInfo);

  const conditions = document.createElement("p");
  conditions.id = "currConditions";
  conditions.textContent = weatherReport.report.currentConditions.conditions;
  leftInfo.appendChild(conditions);

  const currTemp = document.createElement("p");
  currTemp.id = "currTemp";
  currTemp.textContent =
    Math.round(weatherReport.report.currentConditions.temp) + "°";
  leftInfo.appendChild(currTemp);

  const tempRange = document.createElement("div");
  tempRange.id = "tempRange";
  leftInfo.appendChild(tempRange);

  const tempLow = document.createElement("p");
  tempLow.id = "tempLow";
  tempLow.textContent =
    "L: " + Math.round(weatherReport.report.days[0].tempmin) + "°";
  tempRange.appendChild(tempLow);

  const tempHigh = document.createElement("p");
  tempHigh.id = "tempLow";
  tempHigh.textContent =
    "H: " + Math.round(weatherReport.report.days[0].tempmax) + "°";
  tempRange.appendChild(tempHigh);

  const snapshotRight = document.createElement("div");
  snapshotRight.id = "snapshot-right";
  snapshot.appendChild(snapshotRight);

  const feelsLike = document.createElement("p");
  feelsLike.textContent =
    "Feels Like: " +
    Math.round(weatherReport.report.currentConditions.feelslike) +
    "°";
  snapshotRight.appendChild(feelsLike);

  const humidity = document.createElement("p");
  humidity.textContent =
    "Humidity: " +
    Math.round(weatherReport.report.currentConditions.humidity) +
    "%";
  snapshotRight.appendChild(humidity);

  const windSpeed = document.createElement("p");
  windSpeed.textContent =
    "Wind Speed: " + weatherReport.report.currentConditions.windspeed + "mph";
  snapshotRight.appendChild(windSpeed);

  const windGust = document.createElement("p");
  let windGustSpeed = weatherReport.report.currentConditions.windgust;
  if (weatherReport.report.currentConditions.windgust == null) {
    windGustSpeed = 0;
  }
  windGust.textContent = "Wind Gusts: " + windGustSpeed + "mph";
  snapshotRight.appendChild(windGust);
}

async function renderWeeklyReport() {
  const weeklyReport = document.createElement("div");
  weeklyReport.id = "weekly-report";
  document.getElementById("display-page").appendChild(weeklyReport);

  for (let i = 1; i < 7; i++) {
    const div = document.createElement("div");
    div.classList.add("daily-report");
    weeklyReport.appendChild(div);

    const date = weatherReport.report.days[i].datetime;
    const weekday = document.createElement("p");
    weekday.classList.add("daily-report-date");
    weekday.textContent = format(date, "eee");
    div.appendChild(weekday);

    const icon = document.createElement("img");
    const condition = weatherReport.report.days[i].icon;
    icon.classList.add("daily-weather-icon");
    icon.src = weatherIcon[condition];
    div.appendChild(icon);

    const dailyTempRange = document.createElement("div");
    dailyTempRange.classList.add("daily-report-range");
    const dailyLow = Math.round(weatherReport.report.days[i].tempmin);
    const dailyHigh = Math.round(weatherReport.report.days[i].tempmax);
    dailyTempRange.textContent = `${dailyLow}° / ${dailyHigh}°`;
    div.appendChild(dailyTempRange);
  }
}

function renderAdvisoryAlerts() {
  const advisoryBtn = document.createElement("button");
  advisoryBtn.id = "advisory-btn";
  advisoryBtn.textContent = `Advisory Alerts in ${weatherReportCity}`;
  document.getElementById("display-page").appendChild(advisoryBtn);

  const advisoryDisplay = document.createElement("section");
  advisoryDisplay.id = "advisory-display";
  advisoryDisplay.classList.add("hidden");
  document.getElementById("display-page").appendChild(advisoryDisplay);

  weatherReport.report.alerts.forEach((alert) => {
    const alertEvent = document.createElement("h3");
    alertEvent.classList.add("alert-event");
    alertEvent.textContent = alert.event;
    advisoryDisplay.appendChild(alertEvent);

    const description = alert.description.split("*");
    description.forEach((part) => {
      const alertDescription = document.createElement("p");
      alertDescription.classList.add("alert-description");
      alertDescription.textContent = part;
      advisoryDisplay.appendChild(alertDescription);
    });
  });

  advisoryBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("advisory-display").classList.toggle("hidden");
  });
}
function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function initializeWeatherDisplayPage() {
  document.body.style.overflowY = "auto";
  content.innerHTML = "";
  const displayPage = document.createElement("div");
  displayPage.id = "display-page";
  content.appendChild(displayPage);

  // Check for city name in weatherReport object
  if (weatherReport.city) {
    weatherReportCity = capitalizeWords(weatherReport.city);
  } else if (weatherReport.report.address) {
    weatherReportCity = capitalizeWords(weatherReport.report.address);
  } else {
    throw new Error("City name not found");
  }

  renderHeader();
  renderSnapshot();
  renderWeeklyReport();
  console.log(weatherReport);
  if (weatherReport.report.alerts.length !== 0) {
    renderAdvisoryAlerts();
  }
}
