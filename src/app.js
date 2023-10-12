 function formatDate(timestamp){
let date = new Date(timestamp);
 let hours = date.getHours();
  if (hours < 10) {
hours = "0" + hours;
 }
 let minutes = date.getMinutes();
  if (minutes < 10) {
  minutes = "0" + minutes;
}
let days = [
  "Sunday", 
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
 let day = days[date.getDay()];
 return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
    let date = new Date (timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat"];
    return days [day];
}
function displayForecast(response) {
    let forecast = response.data.daily;
    
    let forecastElement = document.querySelector("#forecast");
    
    // let days = ["Thu","Fri","Sat","Sun"];
    let forecastHTML = `<div class = "row">`;
    forecast.forEach(function(forecastDay, index) {
        if (index < 6){
        forecastHTML = 
        forecastHTML +`
           <div class="col-2">
            <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img src= "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
            alt="" width="42" />
            <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">
                    ${Math.round(forecastDay.temperature.maximum)}°</span>
                     <span class="weather-forecast-temperature-min">
                    ${Math.round(forecastDay.temperature.minimum)}°</span>
                     </div>
                     </div>
                     `;
        }
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
console.log(forecastHTML);
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "b55703tf4c018140a2cbco1f5b95fb00";
// let apiKey = "505f974b4b9fcd65d904e6fdfac22c0a";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
// let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
//let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
// let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
// let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
    console.log(response.data.main);
 let temperatureElement = document.querySelector("#temperature");

celsiusTemperature = response.data.main.temp;

 temperatureElement.innerHTML = Math.round(celsiusTemperature);
 let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.name;
let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.weather[0].description;
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = response.data.main.humidity;
let windElement = document.querySelector("#wind");
windElement.innerHTML = Math.round(response.data.wind.speed);
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(response.data.dt * 1000);
let iconElement = document.querySelector("#icon");
iconElement.setAttribute(
    "src",
     `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        // `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);

     iconElement.setAttribute("alt",response.data.weather[0].description);

     getForecast(response.data.coord);
}

function search(city){
let apiKey = "505f974b4b9fcd65d904e6fdfac22c0a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");

    let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature (event){
    event.preventDefault();
    let temperatureElement = document.querySelector ("#temperature");
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

 let form = document.querySelector("#search-form");
 form.addEventListener("submit",handleSubmit);

let fahrenheitLink = document.querySelector ("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kharkiv");
