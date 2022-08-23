//input
const Info = document.querySelector("#info");
const Translate = document.getElementById("Translate");
//After Before Fetch
const DisplayWeather = document.getElementById("DisplayWeather");
const footer = document.getElementById("footer");
//display data
const dpWeather = document.querySelector("#Weather");
const dpTemp = document.querySelector("#Temp");
const dpWind = document.querySelector("#Wind");
const dpRain = document.querySelector("#Rain");
const dpMoisture = document.querySelector("#Moisture");
const dpTime = document.querySelector("#Time");
const dpImgWeather = document.querySelector("#ImgWeather");
const dpLocation = document.querySelector("#Location");
const dpCountry = document.querySelector("#Country");
const dpDate = document.querySelector("#Date");
//ForeCase Data
const fc1ImgWeather = document.querySelector("#ForeCase-1");
const fc2ImgWeather = document.querySelector("#ForeCase-2");
const fc1Time = document.querySelector("#ForeCase-1-Time");
const fc2Time = document.querySelector("#ForeCase-2-Time");
const fc1Temp = document.querySelector("#ForeCase-1-Temp");
const fc2Temp = document.querySelector("#ForeCase-2-Temp");
//data time
const date = new Date();
const hour = date.getHours();
const minute = date.getMinutes();
const Today = date.getDate() + "/" + (date.getMonth() + 1);
const time = date.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

function WeatherAPI() {
  const beforeTranslating = `"${Info.value}"`;
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "42dc2f1aa5msh5bf1af0cc42368fp1f03c6jsn88c35a62d997",
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    },
    body: '[{"Text":' + beforeTranslating + "}]",
  };

  //Translating
  fetch(
    "https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=en&api-version=3.0&profanityAction=NoAction&textType=plain",
    options
  )
    .then((response) => response.json())
    .then((data) => (Translate.value = data[0].translations[0].text))
    .catch((err) => console.error("กรอกข้อมูลที่ถูกต้อง"));

  //Realtime Weather API
  function dtweather(data) {
    console.log(data);
    //data.forecast.forecastday[0].hour[].condition.icon
    //data.forecast.forecastday[0].hour[].temp_c
    const Weather = data.current.condition.text;
    const Temp = data.current.temp_c + "&deg;";
    const Wind = data.current.wind_kph;
    const ImgWeather = data.current.condition.icon;
    const Moisture = data.current.humidity;
    const Location = data.location.name;
    const Country = data.location.country;
    const lowname = Weather.toLowerCase();
    const checkweather = ["sunny", "rain", "cloud", "overcast", "mist"]; //mist = หมอก
    const match = checkweather.map((data) => {
      return lowname.match(data);
    });
    match.forEach((data) => {
      if (data == checkweather[0]) {
        // document.body.style.backgroundColor = 'red';
        document
          .getElementById("realtime")
          .classList.remove(
            "bg-gradient-to-r",
            "from-cyan-200",
            "to-blue-100",
            "from-gray-400",
            "to-gray-100"
          );
        document
          .getElementById("realtime")
          .classList.add(
            "bg-gradient-to-r",
            "from-orange-300",
            "to-orange-100"
          );
      } else if (data == checkweather[1] || data == checkweather[3]) {
        // document.body.style.backgroundColor = 'blue';
        document
          .getElementById("realtime")
          .classList.remove(
            "bg-gradient-to-r",
            "from-cyan-200",
            "to-blue-100",
            "from-orange-300",
            "to-orange-100"
          );
        document
          .getElementById("realtime")
          .classList.add("bg-gradient-to-r", "from-gray-400", "to-gray-100");
      } else if (data == checkweather[2]) {
        // document.body.style.backgroundColor = 'green';
        document
          .getElementById("realtime")
          .classList.remove(
            "bg-gradient-to-r",
            "from-gray-400",
            "to-gray-100",
            "from-orange-300",
            "to-orange-100"
          );
        document
          .getElementById("realtime")
          .classList.add("bg-gradient-to-r", "from-cyan-200", "to-blue-100");
        // document.getElementById("realtime").classList.add('from-cyan-200');
        // document.getElementById("realtime").classList.add('to-blue-100');
      }
    });

    if (data.current.condition.text !== "Clear") {
      dpWeather.innerHTML = Weather;
      dpTemp.innerHTML = Temp;
      dpWind.innerHTML = Wind;
      dpImgWeather.src = ImgWeather;
      dpMoisture.innerHTML = Moisture;
      dpLocation.innerHTML = Location;
      dpCountry.innerHTML = Country;
      console.log(data);
      setInterval(() => {
        const date = new Date();
        const hour = date.toLocaleString("en-US", {
          hour: "numeric",
          hour12: true,
        });
        const hour_ = date.getHours();
        const splithour = hour.split(' ');
        var hour1 = `${Number(splithour[0]) + 1}:00 ${splithour[1]}`
        var hour2 = `${Number(splithour[0]) + 2}:00 ${splithour[1]}`
        const minute = date.getMinutes();
        const Today = date.getDate() + "/" + (date.getMonth() + 1);
        const time = date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        dpTime.innerHTML = time;
          });
      if(hour_ === 23){
           hour1 = `${Number(splithour[0]) - Number(splithour[0])}:00 ${splithour[1]}`
           hour2 = `${(Number(splithour[0]) - Number(splithour[0])) + 1}:00 ${splithour[1]}`

          fc1Time.innerHTML = hour1
          fc2Time.innerHTML = hour2
          fc1Temp.innerHTML = data.forecast.forecastday[0].hour[hour_-hour_].temp_c + '&deg;'
          fc2Temp.innerHTML = data.forecast.forecastday[0].hour[(hour_-hour_)+1].temp_c + '&deg;'
          fc1ImgWeather.src = data.forecast.forecastday[0].hour[hour_-hour_].condition.icon
          fc2ImgWeather.src = data.forecast.forecastday[0].hour[(hour_-hour_)+1].condition.icon
          
        }else{
          if (hour_ === 0) {
            hour1 = `${Number(splithour[0]) - Number(splithour[0])+1}:00 ${splithour[1]}`
           hour2 = `${(Number(splithour[0]) - Number(splithour[0])) + 2}:00 ${splithour[1]}`
          }
          fc1Time.innerHTML = hour1
          fc2Time.innerHTML = hour2
          fc1Temp.innerHTML = data.forecast.forecastday[0].hour[hour_+1].temp_c + '&deg;'
          fc2Temp.innerHTML = data.forecast.forecastday[0].hour[hour_+2].temp_c + '&deg;'
          fc1ImgWeather.src = data.forecast.forecastday[0].hour[hour_+1].condition.icon
          fc2ImgWeather.src = data.forecast.forecastday[0].hour[hour_+2].condition.icon
        }
        dpRain.innerHTML = data.forecast.forecastday[0].day.daily_chance_of_rain;
    
      dpDate.innerHTML = Today;
    }
  }

  setTimeout(() => {
    const option = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "a92bff38c9msh12825a0c18cfffbp1f5c67jsnf6a290d4fbf8",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    const querydata = Translate.value;
    fetch(
      "https://weatherapi-com.p.rapidapi.com/forecast.json?q=" + querydata,
      option
    )
      .then((response) => response.json())
      .then((data) => dtweather(data))
      .catch((err) => console.error("กรอกข้อมูลที่ถูกต้อง"));

    setTimeout(() => {
      DisplayWeather.classList.remove("opacity-0");
      // footer.classList.remove("hidden");
    }, 1000);
  }, 2000);
}
Info.addEventListener("input", WeatherAPI);
