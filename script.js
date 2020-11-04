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
cityName.setAttribute("id", "cityInfo")
cityName.innerHTML = `<span id="date"></span> <span id="icon"></span>`
overviewBody.append(cityName);
let targetTemp = document.createElement("h5")
targetTemp.innerHTML = `Temperature: <span id="temp"></span>`
overviewBody.append(targetTemp);
let targetHumid = document.createElement("h5")
targetHumid.innerHTML = `Humidity: <span id="humid"></span>`
overviewBody.append(targetHumid);
let targetSpeed = document.createElement("h5")
targetSpeed.innerHTML = `Wind Speed: <span id="speed"></span>`
overviewBody.append(targetSpeed);
let targetUv = document.createElement("h5")
targetUv.innerHTML = `UV Index: <span class="badge badge-danger" id="uvIndex">Num</span>`
overviewBody.append(targetUv);



// event when search button is clicked
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  //   grab the text from the input area
  let city = input.value;

  //   request data from weather api corresponding to the city
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=14a2df7296c80f13200f62bb2dd1f835`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    //   result for city, temperature, humidity, wind speed, and UV index
      let cityResult = data.name;
      console.log(cityResult);
      let temperature = data.main.temp;
      console.log(temperature);
      let humidity = data.main.humidity;
      console.log(humidity);
      let windSpeed = data.wind.speed;
      console.log(windSpeed);

      //   add overview section
      searchArea.after(overview);

      
    });
});
