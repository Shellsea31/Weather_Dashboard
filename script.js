// targeted search button and input area
let searchBtn = document.querySelector("button");
let input = document.querySelector("input");

// event when search button is clicked
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
//   grab the text from the input area
  let city = input.value;
  console.log(city);

//   request data from weather api corresponding to the city
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=14a2df7296c80f13200f62bb2dd1f835`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data)
        let temperature = data.main.temp;
        console.log(temperature);
        let humidity = data.main.humidity;
        console.log(humidity);
        let windSpeed = data.wind.speed;
        console.log(windSpeed);

    });

    
    
});
