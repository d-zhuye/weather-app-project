import { initializeWeatherDisplayPage } from "./weather-display";

let userSearch = {
  city: "none",
};
let weatherReport = {};

async function getUserCoordinates() {
  // check if user allows location service
  if (navigator.geolocation) {
    const permission = await navigator.permissions.query({
      name: "geolocation",
    });

    if (permission.state === "granted") {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        weatherReport.latitude = lat;
        weatherReport.longitude = long;
        getUserCity(lat, long);
      });
    } else if (permission.state === "denied") {
      console.error(
        "Access to location services has been denied. Please enable location permissions in your browser or device settings to use this feature."
      );
    }
  } else {
    console.error("Geolocation service not available for browser.");
  }
}

// get user city from lat and long coordinates using Geoapify API

async function getUserCity(lat, long) {
  let response;
  try {
    response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=ffb7959793ea43d885855cda974d3e3a`,
      { method: "GET" }
    );
  } catch (err) {
    console.log(err);
  }

  const json = await response.json();
  const city = await json.features[0].properties.city;
  weatherReport.city = city;
  getUserWeather(city, lat, long);
}

// Get Current Weather from Visual Crossing API
async function getUserWeather(city, lat, long) {
  let response;
  // If lat and long are available fetch weather using coords for accuracy
  if (lat && long) {
    try {
      console.log("Using coords");
      response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?unitGroup=us&key=KN8KKWLCB443EKTSE8MTPE76Z`
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    // else fetch using city name
    try {
      console.log(city);
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=KN8KKWLCB443EKTSE8MTPE76Z&contentType=json`;
      console.log("Using city" + city + "at" + url);
      response = await fetch(url);
    } catch (err) {
      console.log(err);
    }
  }

  if (response) {
    const weatherJSON = await response.json();
    weatherReport.report = weatherJSON;
    initializeWeatherDisplayPage();
  }
}

export { userSearch, weatherReport, getUserCoordinates, getUserWeather };