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
// var outPut = document.getElementById('output');

var apiKey = 'e25de68d1a28278a73de703c2c9a0353';
var current = $('.media-contentT');
var cityLatVar;
var cityLongVar;

var forecast = $('.column');

var searchedCities = [];
var savedCitiesUl = $('.cities');

//where key is numbers and value is city names

// // Store data
// var someData = 'The data that I want to store for later.';

cOut = [];
fetchButton.addEventListener('click', function () {
  event.preventDefault();
  //use whatever is input as the city name
  var city = $('.input').val();
  cOut.push(city);
  localStorage.setItem('city', cOut);
  // var outPut = localStorage.getItem('city');
  document.getElementById('output').innerHTML = localStorage.getItem('city');

  //pulling info for current weather
  var queryURL =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&appid=' +
    apiKey;
  event.preventDefault();
  fetch(queryURL)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      $('#cityName').text(city);

      current.empty();
      var cityName = $('<h1>');
      var dateT = $('<h2>');
      var iconT = $('<img>');
      var tempT = $('<h2>');
      var windT = $('<h2>');
      var humidT = $('<h2>');
      var iconC = data.weather[0].icon;
      var iconU = 'https://openweathermap.org/img/w/' + iconC + '.png';
      iconT.attr('src', iconU);

      cityName.text(data.name);
      dateT.text(new Date().toLocaleDateString('en-US'));
      tempT.text('Temp: ' + data.main.temp + '°F');
      windT.text('Wind: ' + data.wind.speed + ' MPH');
      humidT.text('Humidity: ' + data.main.humidity + '%');
      current.append(cityName);
      current.append(dateT);
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

  fetch(forecastURL)
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
          card.addClass('card');
          date.text(dateVar);
          date.addClass('is-size-5');
          var iconCode = data.list[i].weather[0].icon;
          var iconUrl = 'https://openweathermap.org/img/w/' + iconCode + '.png';
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

function getUVI() {
  var uviURL =
    'https://api.openweathermap.org/data/2.5/onecall?lat=' +
    cityLatVar +
    '&lon=' +
    cityLongVar +
    '&exclude={part}&appid=' +
    apiKey;
  $.ajax({
    url: uviURL,
    method: 'GET',
  }).then(function (data) {
    var indexUVI = data.daily[0].uvi;
    if (indexUVI >= 7) {
      current.append(
        `<button type="button" class="button is-danger">UV Index: ${indexUVI}</button>`
      );
    } else if (indexUVI < 7 && indexUVI >= 3) {
      current.append(
        `<button type="button" class="button is-warning uviBtn">UV Index: ${indexUVI}</button>`
      );
    } else {
      current.append(
        `<button type="button" class="button is-success uviBtn">UV Index: ${indexUVI}</button>`
      );
    }
  });
}

// // Get data
// var data = localStorage.getItem('myDataKey');

// // Remove data
// localStorage.removeItem('myDatakey');
