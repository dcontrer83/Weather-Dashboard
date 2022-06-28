// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=appid=eab8fa3c1c8bcebc6c837354cf80c35a"
var APIKey = "eab8fa3c1c8bcebc6c837354cf80c35a";
var city; 
var cityLat;
var cityLon;


var btn = document.getElementById("btnId");
var input = document.getElementById("exampleInputEmail1");
var cityName = document.getElementById("cityName");
var currentDate = document.getElementById("currentDate");
var currentIcon = document.getElementById("currentIcon");
var currentSrc = document.getElementById("currentIcon");
var currentTemp = document.getElementById("currentTemp");


btn.addEventListener("click", function() {
    city = input.value;
    var latLonURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey;
    fetch(latLonURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            cityName.textContent = "City Name: " + data[0].name;
            cityLat = data[0].lat;
            cityLon = data[0].lon; 
            var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Fetch Response \n-------------');
            console.log(data)
            var unixTimeStamp = data.current.dt;
            // console.log(unixTimeStamp);
            var offsetTime = data.timezone_offset;
            // console.log(offsetTime);
            var timeStamp = unixTimeStamp + offsetTime;
            // console.log(timeStamp);

            //use to get location time zone information
            var date = new Date(timeStamp * 1000);
            var month;
            var day;
            var year;
            month = date.getUTCMonth();
            month = month + 1;
            day = date.getUTCDate();
            year = date.getUTCFullYear();
            currentDate.textContent = "Current Date: " + month + "/" + day + "/" + year;

            //icons for weather 
            var iconNumber = data.current.weather[0].icon;
            currentIcon.src = "http://openweathermap.org/img/wn/" + iconNumber + "@2x.png";

            //current temp
            currentTemp.textContent = "Current Temperature: " + data.current.temp + "°F";
            

        });
        })    

})
