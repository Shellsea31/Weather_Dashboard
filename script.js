// targeted search button and input area
let searchBtn = document.querySelector("button");
let input = document.querySelector("input");

// create elements for overview section
let searchArea = document.querySelector("#search");

// the following is all the content appended to overview section
let overview = document.createElement("div");
overview.setAttribute("class", "card container overview");
let overviewBody = document.createElement("div");
overviewBody.setAttribute("class", "card-body");
overview.append(overviewBody);
let cityName = document.createElement("h2");
cityName.innerHTML = `<span id="city"></span> <span id="date"></span> <img id="icon"></img>`;
overviewBody.append(cityName);
let targetTemp = document.createElement("h5");
targetTemp.innerHTML = `Temperature: <span id="temp"></span>° F`;
overviewBody.append(targetTemp);
let targetHumid = document.createElement("h5");
targetHumid.innerHTML = `Humidity: <span id="humid"></span>%`;
overviewBody.append(targetHumid);
let targetSpeed = document.createElement("h5");
targetSpeed.innerHTML = `Wind Speed: <span id="speed"></span> miles/hour`;
overviewBody.append(targetSpeed);
let targetUv = document.createElement("h5");
targetUv.innerHTML = `UV Index: <span id="uvIndex">Num</span>`;
overviewBody.append(targetUv);

// the following is all content for the forecast
let forecast = document.createElement("div");
forecast.setAttribute("class", "card-body container forecast");
forecast.innerHTML = `<h5>5-Day Forecast:</h5>`;
let row = document.createElement("div");
row.setAttribute("class", "row");
forecast.append(row);
targetUl = document.querySelector(".list-group");


function addHistory(str) {
  let li = document.createElement("li");
li.setAttribute("class", "list-group-item");
li.textContent = str;
li.value = str;
targetUl.append(li);
}

// set variable for parsed item from local storage OR empty local storage
let userHistory = JSON.parse(localStorage.getItem("history")) || [];

// event when search button is clicked
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  //   grab the text from the input area
  let city = input.value;

  // if city is not in the userHistory array push to array and append
  if (userHistory.indexOf(city) === -1) {
    userHistory.push(city);
    localStorage.setItem("history", JSON.stringify(userHistory));
    addHistory(city);
  }

  searchWeather(city);

});

for (let i = 0; i < userHistory.length; i++) {
  addHistory(userHistory[i]);
}

targetUl.addEventListener("click", function(e){
  e.preventDefault();
  let historyItem = e.target.textContent;
  searchWeather(historyItem);
});

function searchWeather (city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=14a2df7296c80f13200f62bb2dd1f835`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   result for city, date, icon, temperature, humidity, wind speed, and UV index
      let cityResult = data.name;
      let icon = data.weather[0].icon;
      let iconPng = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      let temperature = data.main.temp;
      let humidity = data.main.humidity;
      let windSpeed = data.wind.speed;
      let lat = data.coord.lat;
      let lon = data.coord.lon;

      //   add overview section
      searchArea.after(overview);

      document.querySelector("#city").textContent = cityResult;
        document.querySelector("#date").textContent = moment().format('l');   
      document.querySelector("#icon").setAttribute("src", iconPng);
      document.querySelector("#temp").textContent = temperature;
      document.querySelector("#humid").textContent = humidity;
      document.querySelector("#speed").textContent = windSpeed;
      let uvIndexEl = document.querySelector("#uvIndex");

      fetch(
        `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=14a2df7296c80f13200f62bb2dd1f835`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          uvIndexEl.textContent = data.value;

          if (data.value < 3) {
            uvIndexEl.setAttribute("class", "badge badge-success");
          } else if (data.value > 3 && data.value < 6) {
            uvIndexEl.setAttribute("class", "badge badge-warning");
          } else uvIndexEl.setAttribute("class", "badge badge-danger");
        });

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=14a2df7296c80f13200f62bb2dd1f835`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          row.innerHTML = "";
          let forecastData = [
            data.list[7],
            data.list[15],
            data.list[23],
            data.list[31],
            data.list[39],
          ];

          longDate = forecastData[0].dt;

          // create the columns for the 5 day forecast
          for (let i = 0; i < 5; i++) {
            let forecastIcon = forecastData[i].weather[0].icon;
            let columns = document.createElement("div");
            columns.setAttribute("class", "col");
            columns.innerHTML = `<div class="card bg-primary text-white">
            <div class="card-body forecastText">
            <h5 id="forecastDate" class="card-title">${moment.unix(forecastData[i].dt).format("MM/DD/YYYY")}</h5>
            <img src="http://openweathermap.org/img/wn/${forecastIcon}@2x.png"</img>
            <p>Temperature: ${forecastData[i].main.temp}° F</p>
            <p>Humidity: ${forecastData[i].main.humidity}</p>
            </div></div>`;

            row.append(columns);
          }

          overview.after(forecast);
        });
    });
}