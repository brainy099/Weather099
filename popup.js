//opnweathermap API key
let appId = "7adb761c87aef4b3a7124530e48238dc";

//search and fetch API call function
  function searchWeather(searchTerm) {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=${appId}&units=metric`;
    let req = new Request(url, {
        method: 'get'
      });
    fetch(req).then((response)=>{
        return response.json();
    }).then((jsonData)=>{
        console.log(jsonData);
        procResult(jsonData);
    });
  }

//process JSON result and render in the html page
function procResult(jsonData){
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader'),
    temperatureElement = document.getElementById('temperature'),
    humidityElement = document.getElementById('humidity'),
    windSpeedElement = document.getElementById('windSpeed'),
    cityHeader = document.getElementById('cityHeader'),
    weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + jsonData.weather[0].icon + '.png';

    let resultDescription = jsonData.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(jsonData.main.temp) + '&#176';
    windSpeedElement.innerHTML = "Winds at " + Math.floor(jsonData.wind.speed) + 'm/s';
    cityHeader.innerHTML = jsonData.name;
    humidityElement.innerHTML = 'Humidity levels at ' + jsonData.main.humidity + '%';
    
    //makes the weatherInfo visible
    setPositionForWeatherInfo();
}  

function setPositionForWeatherInfo(){
    let weatherContainer = document.getElementById('weatherContainer');

    weatherContainer.style.visibility = 'visible';
}

//event listener
document.getElementById('searchBtn').addEventListener('click', () =>{
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm){
        searchWeather(searchTerm);
    }
})
  //9ecb7fccb1d6a34924a1da7a298b3fb8