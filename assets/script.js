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
var currentTemp = document.getElementById("currentTemp");
var currentHumidity = document.getElementById("currentHumidity");
var currentWindSpeed = document.getElementById("currentWindSpeed");
var currentUV = document.getElementById("currentUV");
var futureForcast = document.getElementById("future");
var searchHistory = document.getElementById("searchHistory");
var searchHistoryNumbers = 0;
var arrayCityName = [];




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

            //seach history
            // if(arrayCityName.length = 0) {
            //     var searchHistoryBtn = document.createElement("button");
            //     searchHistoryBtn.setAttribute("id", "searchHistoryBtn");
            //     searchHistory.append(searchHistoryBtn);
            //     searchHistoryBtn.textContent = data[0].name;
            //     searchHistoryNumbers = searchHistoryNumbers + 1;
            // }

            

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

            //current humidity
            currentHumidity.textContent = "Current Humidity: " + data.current.humidity + "%";

            //current wind speed
            currentWindSpeed.textContent = "Current Wind Speed: " + data.current.wind_speed + "mph";

            //current UV
            var valueUVI = data.current.uvi;
            currentUV.textContent = "Current UV Index: " + valueUVI;

            //color depending on favorable (green), moderate (yellow), or severe (red)
            if(0 <= valueUVI && valueUVI < 3) {
                currentUV.setAttribute("style", "background-color: green");
            }
            else if(3 <= valueUVI && valueUVI < 6) {
                currentUV.setAttribute("style", "background-color: yellow");
            }
            else {
                currentUV.setAttribute("style", "background-color: red");
            }

            for(let i = 0; i < 5; i++) {
                //display date                
                timeStamp = timeStamp + 86400;
                date = new Date(timeStamp * 1000);
                month = date.getUTCMonth();
                month = month + 1;
                day = date.getUTCDate();
                year = date.getUTCFullYear();
                futureDate = document.getElementById("futureDate" + [i]);
                futureDate.textContent = "Date: " + month + "/" + day + "/" + year;

                //display UVI 
                valueUVI = data.daily[i].uvi;
                futureUVI = document.getElementById("futureUVI" + [i]);
                futureUVI.textContent = "UV Index: " + valueUVI;

                if(0 <= valueUVI && valueUVI < 3) {
                    futureUVI.setAttribute("style", "background-color: green");
                }
                else if(3 <= valueUVI && valueUVI < 6) {
                    futureUVI.setAttribute("style", "background-color: yellow");
                }
                else {
                    futureUVI.setAttribute("style", "background-color: red");
                }

                //display icon weather
                iconNumber = data.daily[i].weather[0].icon;
                futureIconWeather = document.getElementById("futureIconWeather" + [i]);
                futureIconWeather.src = "http://openweathermap.org/img/wn/" + iconNumber + "@2x.png";

                //display temperature
                futureTemp = document.getElementById("futureTemp" + [i]);
                futureTemp.textContent = "Temperature: " + data.daily[i].temp.day + "°F";

                //display wind speed
                futureWindSpeed = document.getElementById("futureWindSpeed" + [i]);
                futureWindSpeed.textContent = "Wind Speed: " + data.daily[i].wind_speed + "mph";

                //display humidity
                futureHumidiy = document.getElementById("futureHumidity" + [i]);
                futureHumidiy.textContent = "Humidity: " + data.daily[i].humidity + "%";
            }

        });
        })    

})

//create div tags for future weather section
for(let i = 0; i < 5; i++) {
    var futureForcastElement = document.createElement("div");
    futureForcastElement.setAttribute("id", "futureForcast" + [i]);
    futureForcast.append(futureForcastElement);

}

//create elements for future dates
for(let i = 0; i < 5; i++) {
    var futureDate = document.createElement("h3");
    futureDate.setAttribute("id", "futureDate" + [i]);
    var futureForcast = document.getElementById("futureForcast" + [i]); 
    futureForcast.append(futureDate);
}

//create elements for icon weather
for(let i = 0; i < 5; i++) {
    var futureIconWeather = document.createElement("img");
    futureIconWeather.setAttribute("id", "futureIconWeather" + [i]);
    var futureForcast = document.getElementById("futureForcast" + [i]); 
    futureForcast.append(futureIconWeather);
}

//create elements for temperature
for(let i = 0; i < 5; i++) {
    var futureTemp = document.createElement("h3");
    futureTemp.setAttribute("id", "futureTemp" + [i]);
    var futureForcast = document.getElementById("futureForcast" + [i]); 
    futureForcast.append(futureTemp);
} 

//create elements for wind speed
for(let i = 0; i < 5; i++) {
    var futureWindSpeed = document.createElement("h3");
    futureWindSpeed.setAttribute("id", "futureWindSpeed" + [i]);
    var futureForcast = document.getElementById("futureForcast" + [i]); 
    futureForcast.append(futureWindSpeed);
} 

//create elements for humidity
for(let i = 0; i < 5; i++) {
    var futureHumidiy = document.createElement("h3");
    futureHumidiy.setAttribute("id", "futureHumidity" + [i]);
    var futureForcast = document.getElementById("futureForcast" + [i]); 
    futureForcast.append(futureHumidiy);
} 

//create elements for future UVI
for(let i = 0; i < 5; i++) {
    var futureUVI = document.createElement("h3");
    futureUVI.setAttribute("id", "futureUVI" + [i]);
    var futureForcast = document.getElementById("futureForcast" + [i]); 
    futureForcast.append(futureUVI);
}