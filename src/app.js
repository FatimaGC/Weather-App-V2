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

// Event listener for search form. Runs the search function when the search button is clicked.
const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Prevents page refresh, stores value entered into the search bar, runs getCityTemperature function.
function search(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-text-input");
  const city = searchInput.value;

  getCityTemperature(city);
}

//
function getCityTemperature(city) {
  const queryParameters = `q=${city}`;

  fetchTemperature(queryParameters);
}

//Stores API information and runs showTemperature function for the city searched.
function fetchTemperature(queryParameters) {
  const apiKey = "0a4dc3c696be7291e8d469a7dbee552f";
  let units = "metric";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${units}&${queryParameters}`;
  axios.get(apiUrl).then(showTemperature);
}

// Code for updating the current-weather section with real-time temperature, weather icon, and wind speed information for city searched.

// Global variable to store current celsius temperature.
let celsiusTemperature = null;

//
function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);

  let currentWeather = document.querySelector("#current-weather");
  currentWeather.innerHTML = `${temperature}°`;

  let city = response.data.name;

  // Displays name of city searched
  let currentWeatherTitleLocation = document.querySelector(
    ".current-weather_title-location"
  );
  currentWeatherTitleLocation.innerHTML = city;

  // Displays real-time weather description for city searched.
  let weatherDescription = document.querySelector(
    ".current-weather_description"
  );
  weatherDescription.innerHTML = response.data.weather[0].description;

  // Displays real-time weather icon for city searched and updates the alt attribute to match.
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  icon.setAttribute("alt", response.data.weather[0].description);

  // Displays real-time wind speed for city searched.
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = response.data.wind.speed;

  getForecast(response.data.coord);
}

// Code for weekly forecast

function getForecast(coordinates) {
  const apiKey = "0a4dc3c696be7291e8d469a7dbee552f";
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Injects HTML - creates a new column with the forecast for each day of the week.

function displayForecast(response) {
  let forecast = response.data.daily;
  const forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  // let days = ["Mon", "Tues", "Weds", "Thurs", "Fri", "Sat", "Sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
           <h3>${formatDay(forecastDay.dt)}</h3>
            <span class="weather-icon">
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt=""/>
            </span>
            <p>${Math.round(
              forecastDay.temp.max
            )}° | <span class="weekly-forecast_min_degrees">${Math.round(
          forecastDay.temp.min
        )}°</span></p>
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Code for converting and displaying temperature in both Celsius and Fahrenheit.

// Event listener for clicking on the F unit link runs showFahrenheitTemperature function.
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

// Converts temperature from Celsius to Fahrenheit and displays Fahrenheit temperature instead.
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-weather");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

// Event listener for clicking on the C unit link, runs showCelsiusTemperature function.
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

// Displays Celsius temperature instead of Fahrenheit.
function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-weather");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

// function searchCurrentLocation(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(getCurrentLocationTemperature);
// }

// const currentLocationForm = document.querySelector("#current-location-form");
// currentLocationForm.addEventListener("submit", searchCurrentLocation);

// function getCurrentLocationTemperature(position) {
//   let latitude = position.coords.latitude;
//   let longitude = position.coords.longitude;

//   const queryParameters = `lat=${latitude}&lon=${longitude}`;

//   fetchTemperature(queryParameters);
// }
