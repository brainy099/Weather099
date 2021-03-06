//opnweathermap API key
let appId = "..."; //insert your API Key here

//search and fetch API call function
function searchWeather(searchTerm) {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=${appId}&units=metric`;
  let req = new Request(url, {
    method: "get"
  });
  //fetch call
  fetch(req)
    .then(response => {
      return response.json();
    })
    .then(jsonData => {
      console.log(jsonData);
      procResult(jsonData); //send jsonData to process function
    });
}

//find location and fetch API
function locWeather(lat, lon) {
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${appId}&units=metric`;
  let req = new Request(url, {
    method: "get"
  });
  fetch(req) //fetch call
    .then(response => {
      return response.json();
    })
    .then(jsonData => {
      procResult(jsonData);
    });
}

//process JSON result and render in the html page
function procResult(jsonData) {
  //switch case for dynamic background based on weather
  switch (jsonData.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = 'url("images/clear.jpeg")';
      break;
    case "Clouds":
      document.body.style.backgroundImage = 'url("images/cloudy.jpeg")';
      break;
    case "Rain":
    case "Drizzle":
    case "Mist":
      document.body.style.backgroundImage = 'url("images/rainy.jpeg")';
      break;
    case "Thunderstorm":
      document.body.style.backgroundImage = 'url("images/storm.jpeg")';
      break;
    case "Snow":
      document.body.style.backgroundImage = 'url("images/snow.jpeg")';
      break;
    default:
      document.body.style.backgroundImage = 'url("images/clear.jpeg")';
      break;
  }

  //setting weather elements to respective variables
  let weatherDescriptionHeader = document.getElementById(
      "weatherDescriptionHeader"
    ),
    temperatureElement = document.getElementById("temperature"),
    humidityElement = document.getElementById("humidity"),
    windSpeedElement = document.getElementById("windSpeed"),
    cityHeader = document.getElementById("cityHeader"),
    country = document.getElementById("country"),
    weatherIcon = document.getElementById("documentIconImg");

 //assigning corresponding jsonData key-valuse with the weather elements   
  weatherIcon.src =
    "http://openweathermap.org/img/w/" + jsonData.weather[0].icon + ".png";


  let resultDescription = jsonData.weather[0].description;
  weatherDescriptionHeader.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
  temperatureElement.innerHTML = Math.floor(jsonData.main.temp) + "&#176 C";
  windSpeedElement.innerHTML =
    "Winds at " + Math.floor(jsonData.wind.speed) + "m/s";
  cityHeader.innerHTML = jsonData.name;
  humidityElement.innerHTML =
    "Humidity levels at " + jsonData.main.humidity + "%";
  country.innerHTML = jsonData.sys.country;

  //makes the weatherInfo visible
  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById("weatherContainer");

  weatherContainer.style.visibility = "visible";
}

//event handler for search button
document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) {
    searchWeather(searchTerm);
  }
});

//event handler for geolocation finder

document.getElementById("locButton").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      locWeather(lat, lon);
    });
  }
});

//Alternative API key 9ecb7fccb1d6a34924a1da7a298b3fb8
