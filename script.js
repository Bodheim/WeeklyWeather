//var promise = new Promise((resolve.reject) {})

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//q: The query parameter, where we'll add the city variable.
//appid: The application id or key, where we'll add the API key variable.
//test the id and all in your browser:
//http://api.openweathermap.org/data/2.5/weather?q=Denver&appid=e25de68d1a28278a73de703c2c9a0353
//this pulls weather info and does not give an error so I know the
//city and api key are what it needs.

//var city = document.getElementById('city');\
//use so selecting fetch button will pull api request
var fetchButton = document.getElementById('fetch-button');
var apiKey = 'e25de68d1a28278a73de703c2c9a0353';
var current = $('.media-contentT');
var cityLatVar;
var cityLongVar;

var forecast = $('.media-content');
var userCitiesArray = [];
var savedCitiesUl = $('.cities');

fetchButton.addEventListener('click', function () {
  //use whatever is input as the city name
  var city = $('.input').val();

  //pulling info for current weather
  var queryURL =
    'http://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&appid=' +
    apiKey;

  fetch(queryURL)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      $('#cityName').text(city);

      current.empty();
      var cityName = $('<h1>');
      var iconT = $('<img>');
      var tempT = $('<h2>');
      var windT = $('<h2>');
      var humidT = $('<h2>');
      var iconC = data.weather[0].icon;
      var iconU = 'http://openweathermap.org/img/w/' + iconC + '.png';
      iconT.attr('src', iconU);
      cityName.text(data.name + ' ' + new Date().toLocaleDateString('en-US'));
      tempT.text('Temp: ' + data.main.temp + '°F');
      windT.text('Wind: ' + data.wind.speed + ' MPH');
      humidT.text('Humidity: ' + data.main.humidity + '%');
      current.append(cityName);
      current.append(iconT);
      current.append(tempT);
      current.append(windT);
      current.append(humidT);
      console.log(current);
    });

  //pulling info for next 5 days forcast
  var forecastURL =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    city +
    '&units=imperial&appid=' +
    apiKey;

  fetch(queryURL)
    .then((response) => response.json())
    .then(function (data) {
      cityLatVar = data.city.coord.lat;
      cityLongVar = data.city.coord.lon;
      forecast.empty();
      console.log(data);
      //for i where i=0 reps tomorrow's forecast
      //to imax is the5th day's forecast
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.search('18:00:00') != -1) {
          var rawDateVar = data.list[i].dt_txt;
          var dateVar = moment(rawDateVar).format('dddd, MMMM Do');
          var card = $('<div>');
          var date = $('<h2>');
          var icon = $('<img>');
          var temp = $('<h2>');
          var wind = $('<h2>');
          var humid = $('<h2>');
          date.text(dateVar);
          date.addClass('is-size-5');
          var iconCode = data.list[i].weather[0].icon;
          var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
          icon.attr('src', iconUrl);
          temp.text('Temp: ' + data.list[i].main.temp + '°F');
          wind.text('Wind: ' + data.list[i].wind.speed + ' MPH');
          humid.text('Humidity: ' + data.list[i].main.humidity + '%');
          card.append(date);
          card.append(icon);
          card.append(temp);
          card.append(wind);
          card.append(humid);
          forecast.append(card);
          forecast.append('<br>');
        }
      }
      getUVI();
    });
});
let dateT = new Date().toLocaleDateString();
$('#dateT').text(dateT);

// var nextDays = [];
// //itterate to pull next 5 days
// for (i = 1; i < 6; i++) {
//   const nextDay = new Date(dateT);
//   nextDay.setDate(nextDay.getDate() + i);
//   var nextDays = nextDay.toLocaleDateString();
//   $('#date').text(nextDays);
//   console.log(nextDays);
// }

// const today = new Date()
// const tomorrow = new Date(today)
// tomorrow.setDate(tomorrow.getDate() + 1)

//card variables

// var tempT = document.getElementById('tempT');
// var windT = document.getElementById('windT');
// var humidT = document.getElementById('humidT');
// var UVIndexT = document.getElementById('UVIndexT');

// var icon = document.getElementById('icon'); weather.icon
// var temp = document.getElementById('temp'); main.temp
// var wind = document.getElementById('wind'); wind.speed & wind.deg
// var humid = document.getElementById('humid'); main.humidity

//AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions
//for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon
//representation of weather conditions, the temperature, the humidity,
//the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the
//conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date,
//an icon representation of weather conditions, the temperature,
//the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions
//for that city
