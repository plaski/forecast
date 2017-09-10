'use strict';

searchButton.addEventListener('click', function (e) {
  e.preventDefault();
  searchWeather();
});
searchForm.addEventListener('keydown', function (e) {
  var key = e.which || e.keyCode;
  if (key == 13) {
    e.preventDefault();
    searchWeather();
  }
});

function searchWeather() {
  console.log('searchweather');
  metricData = [];
  imperialData = [];
  weatherContainer.style.display = 'none';
  forecastContainer.style.display = 'none';
  errorContainer.style.display = 'none';
  var cityName = searchInput.value;
  if (cityName.trim().length == 0) {
    errorContainer.style.display = 'block';
    errorMessage.textContent = 'Please enter a city name!';
    searchForm.reset();
    return;
  } else if (cityName.trim().length < 3) {
    errorContainer.style.display = 'block';
    errorMessage.textContent = 'City name is too short!';
    searchForm.reset();
    return;
  }
  loaderContainer.style.display = 'block';
  var http = new XMLHttpRequest();
  var apiKey = '23e9f3c6f0ef46ab885180344172507';
  var url = 'https://api.apixu.com/v1/forecast.json?key=' + apiKey + '&q=' + cityName + '&days=10';
  var method = 'GET';
  http.open(method, url);
  http.onreadystatechange = function () {
    if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
      var data = JSON.parse(http.responseText);
      workWithData(data);
      searchForm.reset();
    } else if (http.readyState == XMLHttpRequest.DONE) {
      loaderContainer.style.display = 'none';
      errorContainer.style.display = 'block';
      errorMessage.textContent = 'Something went wrong, please try again!';
      searchForm.reset();
      return;
    }
  };
  http.send();
}

function workWithData(data) {
  var weatherData = new Weather(data.location.name, data.location.country, data.current.condition.icon, data.current.condition.text, data.current.temp_c, data.current.temp_f, data.current.feelslike_c, data.current.feelslike_f, data.current.wind_kph, data.current.wind_mph, data.current.vis_km, data.current.vis_miles, data.current.pressure_mb, data.current.pressure_in, data.current.humidity);

  updateWeather(weatherData);
  updateForecast(data);

  weatherContainer.style.display = 'block';
  loaderContainer.style.display = 'none';
  forecastContainer.style.display = 'block';

  (function getMetricData() {
    metricData = weatherData.showMetricData();
  })();
  updateMetricData(metricData);

  weatherDegreesC.addEventListener('click', function () {
    weatherDegreesC.classList.add('active');
    weatherDegreesF.classList.remove('active');

    updateMetricData(metricData);
  });
  weatherDegreesF.addEventListener('click', function () {
    weatherDegreesF.classList.add('active');
    weatherDegreesC.classList.remove('active');
    imperialData = weatherData.showImperialData();
    updateImperialData(imperialData);
  });
}

function updateWeather(weatherData) {
  weatherCity.textContent = weatherData.cityName + ",";
  weatherCountry.textContent = weatherData.countryName;
  weatherIcon.src = weatherData.icon;
  weatherDescription.textContent = weatherData.description;
  weatherHumidity.textContent = weatherData.humidity;
  weatherDegrees.textContent = weatherData.tempC;

  weatherDegreesC.classList.add('active');
  weatherDegreesF.classList.remove('active');

  weatherContainer.style.display = 'block';
  loaderContainer.style.display = 'none';
  forecastContainer.style.display = 'block';
}

function updateMetricData(metricData) {
  if (metricData.length > 0) {
    weatherDegrees.textContent = metricData[0];
    weatherFeelsLike.textContent = metricData[1];
    weatherWind.textContent = metricData[2];
    weatherVisibility.textContent = metricData[3];
    weatherBarometer.textContent = metricData[4];
  }

  if (forecastMetricData.length > 0) {
    for (var i = 0; i < forecastTempMaxArray.length; i++) {
      forecastTempMaxArray[i].textContent = forecastMetricData[i * 2];
      forecastTempMinArray[i].textContent = forecastMetricData[i * 2 + 1];
    }
  }
}

function updateImperialData(imperialData) {
  if (imperialData.length > 0) {
    weatherDegrees.textContent = imperialData[0];
    weatherFeelsLike.textContent = imperialData[1];
    weatherWind.textContent = imperialData[2];
    weatherVisibility.textContent = imperialData[3];
    weatherBarometer.textContent = imperialData[4];
  }

  if (forecastImperialData.length > 0) {
    for (var i = 0; i < forecastTempMaxArray.length; i++) {
      forecastTempMaxArray[i].textContent = forecastImperialData[i * 2];
      forecastTempMinArray[i].textContent = forecastImperialData[i * 2 + 1];
    }
  }
}

function updateForecast(data) {
  updateDates();
  for (var i = 0; i < forecastContainerLength; i++) {
    forecastMetricData.push(data.forecast.forecastday[i + 1].day.maxtemp_c.toFixed(0) + "°", data.forecast.forecastday[i + 1].day.mintemp_c.toFixed(0) + "°");
    forecastImperialData.push(data.forecast.forecastday[i + 1].day.maxtemp_f.toFixed(0) + "°", data.forecast.forecastday[i + 1].day.mintemp_f.toFixed(0) + "°");
    forecastImageArray[i].src = "https:" + data.forecast.forecastday[i + 1].day.condition.icon;
    forecastTempMaxArray[i].textContent = data.forecast.forecastday[i + 1].day.maxtemp_c.toFixed(0) + "°";
    forecastTempMinArray[i].textContent = data.forecast.forecastday[i + 1].day.mintemp_c.toFixed(0) + "°";
    forecastDescriptionArray[i].textContent = data.forecast.forecastday[i + 1].day.condition.text;
    forecastDateArray[i].textContent = days[(today + i) % 7] + ' ' + data.forecast.forecastday[i + 1].date.slice(-2);
  }
}
function updateDates() {
  today = new Date().getDay();
}