let apikey = "13793ceede5a55f634fcaf510ecf0dec";
let units = "imperial";
let searchMethod;
//https://www.youtube.com/watch?v=ZPG2wGNj6J4
//stopped at 45:00; DONE
function getSearchMethod(searchTerm){
  if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
    searchMethod ='zip';
  else
    searchMethod = 'q';
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${apikey}&units=${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(result => {
      init(result);
    });
}

function init(resultfromServer){
  // console.log(resultfromServer);
  switch (resultfromServer.list[0].weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImage = 'url("items/clear.jpg")';
      break;

    case 'Clouds':
      document.body.style.backgroundImage = 'url("items/clouds.jpg")';
      break;

    case 'Thunderstorm':
      document.body.style.backgroundImage = 'url("items/thunderstorm.jpg")';
      break;

    case 'Drizzle':
      document.body.style.backgroundImage = 'url("items/drizzle.jpeg")';
      break;

    case 'Mist':
      document.body.style.backgroundImage = 'url("items/mist.jpg")';
      break;

    case 'Rain':
      document.body.style.backgroundImage = 'url("items/rain.jpg")';
      break;

    case 'Snow':
      document.body.style.backgroundImage = 'url("items/snow.jpg")';
      break;

    case 'Atmosphere':
      //document.body.style.backgroundImage = 'url("atmosphere.jpg")';
      break;

    default:
      break;
  }
  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  let temperatureElement = document.getElementById('temperature');
  let humidityElement = document.getElementById('humidity');
  let windSpeedElement = document.getElementById('windSpeed');
  let cityHeader = document.getElementById('cityHeader');
  let weatherIcon = document.getElementById('documentIconImg');

  weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultfromServer.list[0].weather[0].icon + '.png';

  let resultDescription = resultfromServer.list[0].weather[0].description;
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temperatureElement.innerHTML = Math.floor(resultfromServer.list[0].main.temp) + '&#176';
  windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultfromServer.list[0].wind.speed) + ' m/s';
  cityHeader.innerHTML = resultfromServer.city.name;
  humidityElement.innerHTML = 'Humidity levels at ' + resultfromServer.list[0].main.humidity + '%';

  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo(){
  let weatherContainer = document.getElementById('weatherContainer');
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
  weatherContainer.style.visibility = `visible`;

}

document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) {
    searchWeather(searchTerm);
  }
});
