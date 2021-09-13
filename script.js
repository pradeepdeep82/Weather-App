async function weatherInfo() {
  try {
    const city = document.querySelector(".city").value;
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=87cfbc9449359a5449b017e2d4c55013`
    );
    const weatherData = await data.json();
    console.log(weatherData);

    function unixToIST(x) {
      let unix_timestamp = x;
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(unix_timestamp * 1000);
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      var formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

      let time = formattedTime;
      // Check correct time format and split into components
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join(""); // return adjusted time or original string
    }

    document.querySelector(".weatherDetails").innerHTML = "";
    document.querySelector(".weatherDetails").innerHTML = `
  <div class="weatherCard">
    <br>
    <i class="fas fa-map-marker-alt"></i> <br>
    <h4>${city}, ${weatherData.sys.country}</h4>
    <img src= "http://openweathermap.org/img/w/${
      weatherData.weather[0].icon
    }.png" alt="iconImg">
    <h3>${weatherData.weather[0].description}</h3>
    <h1>${weatherData.main.temp} &#8451</h1>
    <h4><i class="fas fa-temperature-low"></i> Feels Like: ${
      weatherData.main.feels_like
    } &#8451</h4> <br><br>
    <div class="wind">
      <h5><i class="fas fa-wind"></i> Wind Speed: ${
        weatherData.wind.speed
      }meter/sec</h5>
      <h5><i class="fas fa-humidity"></i> Humiditty: ${
        weatherData.main.humidity
      }%</h5>  
    </div>
    <div class="sun">
      <h5><i class="fad fa-sunrise"></i>${unixToIST(
        weatherData.sys.sunrise
      )}AM</h5>
      <h5><i class="fas fa-sunset"></i>${unixToIST(weatherData.sys.sunset)}</h5>
    </div> 
  </div> <br>
  <button type="button" class="btn btn-danger" onclick="clearPage()">Clear</button>`;
  } catch (err) {
    document.querySelector(".weatherDetails").innerHTML = `
  <strong>Sorry... some error have occured</strong>`;
    console.log("error");
  }
}

function Enter() {
  if (event.keyCode === 13) {
    weatherInfo();
  }
}
function clearPage() {
  document.querySelector(".weatherDetails").innerHTML = "";
  document.querySelector(".city").value = "";
}
