// targeted search button and input area
let searchBtn = document.querySelector("button")
let input = document.querySelector("input")

// event when search button is clicked
searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    // right now it just console.logs the users text search
    console.log(input.value);
})