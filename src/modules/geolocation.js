async function getUserCity(lat, long) {
  console.log(lat + "," + long);
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=ffb7959793ea43d885855cda974d3e3a`,
    { method: "GET" }
  );

  const json = await response.json();
  const city = await json.features[0].properties.city;
  console.log(json);
  console.log(city);
}

function getUserCoordinates() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      console.log(lat + "," + long);
      getUserCity(lat, long);
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

getUserCoordinates();
