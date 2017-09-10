'use strict';

var searchForm = document.querySelector('#searchForm');
var searchButton = document.querySelector('#searchButton');
var searchInput = document.querySelector('#searchInput');

var weatherContainer = document.querySelector('#weatherContainer');
var loaderContainer = document.querySelector('#loader');
var errorContainer = document.querySelector('#error');
var errorMessage = document.querySelector('#errorMessage');

var forecastContainer = document.querySelector('#forecast');
var forecastContainerLength = forecastContainer.querySelectorAll('.day-wrap').length;

var weatherCity = document.querySelector('#weatherCity');
var weatherCountry = document.querySelector('#weatherCountry');
var weatherIcon = document.querySelector('#weatherIcon');
var weatherDegrees = document.querySelector('#weatherDegrees');
var weatherDescription = document.querySelector('#weatherDescription');
var weatherFeelsLike = document.querySelector('#weatherFeelsLike');
var weatherWind = document.querySelector('#weatherWind');
var weatherVisibility = document.querySelector('#weatherVisibility');
var weatherBarometer = document.querySelector('#weatherBarometer');
var weatherHumidity = document.querySelector('#weatherHumidity');
var weatherDewPoint = document.querySelector('#weatherDewPoint');

var weatherDegreesC = document.querySelector('#weatherDegreesC');
var weatherDegreesF = document.querySelector('#weatherDegreesF');

var forecastImageArray = forecastContainer.querySelectorAll('.forecast__image > img');
var forecastTempMaxArray = forecastContainer.querySelectorAll('.forecast__degree__max');
var forecastTempMinArray = forecastContainer.querySelectorAll('.forecast__degree__min');
var forecastDescriptionArray = forecastContainer.querySelectorAll('.forecast__description');
var forecastDateArray = forecastContainer.querySelectorAll('.forecast__date');

var metricData = [];
var imperialData = [];
var forecastMetricData = [];
var forecastImperialData = [];
var days = ['Sun', 'Mon', 'Tue', 'Wed', "Thu", 'Fri', 'Sat'];
var today = void 0;