// Updates the date and time in the header to the current date and time
function updateDate(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[currentDate.getDay()];
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  // Update formatedDate to ``${day}, ${month}, {date} ${hours}:${minutes}`
  const formatedDate = `${day} ${hours}:${minutes}`;
  return formatedDate;
}

const currentDate = new Date();

const dateDisplay = document.querySelector("#date");

dateDisplay.innerHTML = updateDate(currentDate);

// Updates current-weather_title when a city is entered in the search bar
function search(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-text-input");
  const city = searchInput.value;

  getCityTemperature(city);
}
const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// function searchCurrentLocation(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(getCurrentLocationTemperature);
// }

// const currentLocationForm = document.querySelector("#current-location-form");
// currentLocationForm.addEventListener("submit", searchCurrentLocation);

// Allows user to search for a city then updates the current-weather_title and the current temp for that city
function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);

  let currentWeather = document.querySelector("#current-weather");
  currentWeather.innerHTML = `${temperature}°`;
  let city = response.data.name;
  let currentWeatherTitleLocation = document.querySelector(
    ".current-weather_title-location"
  );
  currentWeatherTitleLocation.innerHTML = city;
  let weatherDescription = document.querySelector(
    ".current-weather_temperature-list_description"
  );
  weatherDescription.innerHTML = response.data.weather[0].description;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  icon.setAttribute("alt", response.data.weather[0].description);
}

function fetchTemperature(queryParameters) {
  const apiKey = "0a4dc3c696be7291e8d469a7dbee552f";
  let units = "metric";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${units}&${queryParameters}`;
  axios.get(apiUrl).then(showTemperature);
}
function getCityTemperature(city) {
  const queryParameters = `q=${city}`;

  fetchTemperature(queryParameters);
}

// function getCurrentLocationTemperature(position) {
//   let latitude = position.coords.latitude;
//   let longitude = position.coords.longitude;

//   const queryParameters = `lat=${latitude}&lon=${longitude}`;

//   fetchTemperature(queryParameters);
// }
