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
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=14a2df7296c80f13200f62bb2dd1f835`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
    
});
