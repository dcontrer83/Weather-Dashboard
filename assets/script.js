// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=appid=eab8fa3c1c8bcebc6c837354cf80c35a"
var APIKey = "eab8fa3c1c8bcebc6c837354cf80c35a";
var city; 


var btn = document.getElementById("btnId");
var input = document.getElementById("exampleInputEmail1");


btn.addEventListener("click", function() {
    city = input.value;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Fetch Response \n-------------');
            console.log(data)
        });
    

})



