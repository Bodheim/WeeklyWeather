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
var city = document.getElementById('city');

fetchButton.addEventListener('click', function () {
  var APIKey = 'e25de68d1a28278a73de703c2c9a0353';
  var queryURL =
    'http://api.openweathermap.org/data/2.5/weather?q=' +
    city.value +
    '&appid=' +
    APIKey;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => console.log(data));

  $('#cityName').text(city.value);
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
