import logo from "../assets/logo.png";
import searchIcon from "../assets/search-icon.svg";
import { weatherReport } from "./geolocation";
import { format } from "date-fns";
import thunderIcon from "../assets/thunder.svg";
import rainyIcon from "../assets/rainy.svg";
import snowyIcon from "../assets/snowy.svg";
import sunnyIcon from "../assets/sunny.svg";
import cloudyIcon from "../assets/cloudy.svg";
import partlySunnyIcon from "../assets/partly-cloudy.svg";

const weatherIcon = {
    "partly-cloudy-day": partlySunnyIcon,
    "rain": rainyIcon,
}

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

  const searchContainer = document.createElement("div");
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
}

function renderContent() {
    const snapshot = document.createElement("div");
    snapshot.id = "snapshot";
    content.appendChild(snapshot);

    const cityName = document.createElement("h1");
    cityName.id = "cityName";
    cityName.textContent = weatherReport.city;
    snapshot.appendChild(cityName);

    const snapshotLeft = document.createElement("div");
    snapshotLeft.id = "snapshot-left";
    snapshot.appendChild(snapshotLeft);

    const conditions = document.createElement("p");
    conditions.id = "currConditions";
    conditions.textContent = weatherReport.report.currentConditions.conditions;
    snapshotLeft.appendChild(conditions);

    const currTemp = document.createElement("p");
    currTemp.id = "currTemp";
    currTemp.textContent = weatherReport.report.currentConditions.temp + "°";
    snapshotLeft.appendChild(currTemp);

    const tempRange = document.createElement("div");
    tempRange.id = "tempRange";
    snapshotLeft.appendChild(tempRange);

    const tempLow = document.createElement("p");
    tempLow.id = "tempLow";
    tempLow.textContent = "L: " + weatherReport.report.days[0].tempmin + "°";
    tempRange.appendChild(tempLow);

    const tempHigh = document.createElement("p");
    tempHigh.id = "tempLow";
    tempHigh.textContent = "H: " + weatherReport.report.days[0].tempmax + "°";
    tempRange.appendChild(tempHigh);

    const snapshotRight = document.createElement("div");
    snapshotRight.id = "snapshot-right";
    snapshot.appendChild(snapshotRight);

    const feelsLike = document.createElement("p");
    feelsLike.textContent = "Feels Like: " + weatherReport.report.currentConditions.feelslike + "°";
    snapshotRight.appendChild(feelsLike);

    const humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + weatherReport.report.currentConditions.humidity + "%";
    snapshotRight.appendChild(humidity);

    const windSpeed = document.createElement("p");
    windSpeed.textContent = "Wind Speed: " + weatherReport.report.currentConditions.windspeed + "mph";
    snapshotRight.appendChild(windSpeed);

    const windGust = document.createElement("p");
    windGust.textContent = "Wind Gusts: " + weatherReport.report.currentConditions.windgust + "mph";
    snapshotRight.appendChild(windGust);
}

async function renderWeeklyReport() {
    const weeklyReport = document.createElement("div");
    weeklyReport.id = "weekly-report";
    content.appendChild(weeklyReport);

    for (let i = 1; i < 6; i++) {
        const div = document.createElement("div");
        div.classList.add("daily-report");
        weeklyReport.appendChild(div);

        const date = weatherReport.report.days[i].datetime;
        const weekday = document.createElement("p");
        weekday.classList.add("daily-report-date");
        weekday.textContent = format(date, "eee");;
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
        dailyTempRange.textContent = `${dailyLow}° / ${dailyHigh}°` 
        div.appendChild(dailyTempRange);

    }




}

export function initializeWeatherDisplayPage() {
  content.innerHTML = "";
  renderHeader();
  renderContent();
  renderWeeklyReport();
}


