'use strict';

var Weather = function Weather(cityName, countryName, icon, description, tempC, tempF, feelslikeC, feelslikeF, windKph, windMph, visKm, visMiles, pressureMb, pressureIn, humidity) {
  this.cityName = cityName;
  this.countryName = countryName;
  this.icon = "https:" + icon;
  this.description = description;
  this.tempC = tempC + "°";
  this.tempF = tempF + "°";
  this.feelslikeC = feelslikeC + "°";
  this.feelslikeF = feelslikeF + "°";
  this.windKph = windKph + "kph";
  this.windMph = windMph + "mph";
  this.visKm = visKm + "km";
  this.visMiles = visMiles + "mi";
  this.pressureMb = pressureMb + "hPa";
  this.pressureIn = pressureIn + "in";
  this.humidity = humidity + "%";

  this.showMetricData = function () {
    return [this.tempC, this.feelslikeC, this.windKph, this.visKm, this.pressureMb];
  };

  this.showImperialData = function () {
    return [this.tempF, this.feelslikeF, this.windMph, this.visMiles, this.pressureIn];
  };
};