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

//forecast 1
const fc1ImgWeather = document.querySelector("#ForeCase-1");
const fc1Time = document.querySelector("#ForeCase-1-Time");
const fc1Temp = document.querySelector("#ForeCase-1-Temp");

//forecast 2
const fc2ImgWeather = document.querySelector("#ForeCase-2");
const fc2Time = document.querySelector("#ForeCase-2-Time");
const fc2Temp = document.querySelector("#ForeCase-2-Temp");

const RealTime = document.getElementById("realtime");

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
    const checkweather = [
      "sunny",
      "rain",
      "cloud",
      "overcast",
      "mist",
      "thunder",
      "clear",
    ]; //mist = หมอก
    const Weather = data.current.condition.text;
    const Temp = data.current.temp_c + "&deg;";
    const Wind = data.current.wind_kph;
    const ImgWeather = data.current.condition.icon;
    const Moisture = data.current.humidity;
    const Location = data.location.name;
    const Country = data.location.country;

    

    const Weatherlowname = Weather.toLowerCase();
    const match = checkweather.map((data) => {
      return Weatherlowname.match(data);
    });
    match.forEach((data) => {
      if (data == checkweather[0]) {
        // document.body.style.backgroundColor = 'red';
        RealTime.classList.remove(
          "bg-gradient-to-r",
          "from-cyan-200",
          "to-blue-100",
          "from-gray-400",
          "to-gray-100"
        );
        RealTime.classList.add(
          "bg-gradient-to-r",
          "from-orange-300",
          "to-orange-100"
        );
      } else if (
        data == checkweather[1] ||
        data == checkweather[3] ||
        data == checkweather[5]
      ) {
        // document.body.style.backgroundColor = 'blue';
        RealTime.classList.remove(
          "bg-gradient-to-r",
          "from-cyan-200",
          "to-blue-100",
          "from-orange-300",
          "to-orange-100"
        );
        RealTime.classList.add(
          "bg-gradient-to-r",
          "from-gray-400",
          "to-gray-100"
        );
      } else if (data == checkweather[2] || data == checkweather[6]) {
        RealTime.classList.remove(
          "bg-gradient-to-r",
          "from-gray-400",
          "to-gray-100",
          "from-orange-300",
          "to-orange-100"
        );
        RealTime.classList.add(
          "bg-gradient-to-r",
          "from-cyan-200",
          "to-blue-100"
        );
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
      setInterval(() => {
        const date = new Date();
        const Today = date.getDate() + "/" + (date.getMonth() + 1);
        const time = date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        dpTime.innerHTML = time;
        dpDate.innerHTML = Today;
      });
      dpRain.innerHTML = data.forecast.forecastday[0].day.daily_chance_of_rain;
    }
    {
      const elefc1 = document.querySelector("#Forecast-1-bg");
      const elefc2 = document.querySelector("#Forecast-2-bg");

      const getdate = new Date();
      const hourUs = getdate?.toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      });
      const hour = getdate?.getHours();
      const splithour = hourUs.split(" ");
      const ForecastTemp = () => {
        var TempForecast_1 = data.forecast.forecastday[0]?.hour[0]?.temp_c;
        var TempForecast_2 = data.forecast.forecastday[0]?.hour[1]?.temp_c;
        if (hour != 23) {
          TempForecast_1 = data.forecast.forecastday[0].hour[hour + 1].temp_c;
          TempForecast_2 = data.forecast.forecastday[0].hour[hour + 2].temp_c;
        }
        fc1Temp.innerHTML = TempForecast_1 + "&deg;";
        fc2Temp.innerHTML = TempForecast_2 + "&deg;";
      };
      const ForecastTime = () => {
        var TimeForecast_1 = `${Number(splithour[0]) - Number(splithour[0])}:00 ${splithour[1]}`;
        var TimeForecast_2 = `${Number(splithour[0]) - Number(splithour[0]) + 1}:00 ${splithour[1]}`;
        if (hour != 23) {
          TimeForecast_1 = `${Number(splithour[0]) + 1}:00 ${splithour[1]}`;
          TimeForecast_2 = `${Number(splithour[0]) + 2}:00 ${splithour[1]}`;
        }
        fc1Time.innerHTML = TimeForecast_1;
        fc2Time.innerHTML = TimeForecast_2;
      };
      const ForecastImg = () => {
        var ImgForecast_1 = data.forecast.forecastday[0].hour[0]?.condition?.icon;
        var ImgForecast_2 = data.forecast.forecastday[0].hour[1]?.condition?.icon;
        if (hour != 23) {
          ImgForecast_1 =
            data.forecast.forecastday[0].hour[hour + 1].condition.icon;
          ImgForecast_2 =
            data.forecast.forecastday[0].hour[hour + 2].condition.icon;
        }
        fc1ImgWeather.src = ImgForecast_1;
        fc2ImgWeather.src = ImgForecast_2;
      };
      const ForecastBg = () => {
        var TextForecast_1 =
          data.forecast.forecastday[0].hour[0]?.condition?.text;
        var TextForecast_2 =
          data.forecast.forecastday[0].hour[1]?.condition?.text;
        if (hour != 23) {
          TextForecast_1 =
            data.forecast.forecastday[0].hour[hour + 1].condition.text;
          TextForecast_2 =
            data.forecast.forecastday[0].hour[hour + 2].condition.text;
        }
        const TextForecast_1_lowname = TextForecast_1?.toLowerCase();
        const TextForecast_2_lowname = TextForecast_2?.toLowerCase();
        const TextForecast_1_match = checkweather.map((data) => {
          return TextForecast_1_lowname?.match(data);
        });
        const TextForecast_2_match = checkweather.map((data) => {
          return TextForecast_2_lowname?.match(data);
        });
        TextForecast_1_match.forEach((data) => {

          if (data == checkweather[0]) {
            elefc1.classList.remove(
              "bg-gradient-to-r",
              "from-cyan-200",
              "to-blue-100",
              "from-gray-400",
              "to-gray-100"
            );
            elefc1.classList.add(
              "bg-gradient-to-r",
              "from-orange-300",
              "to-orange-100"
            );
          } else if (
            data == checkweather[1] ||
            data == checkweather[3] ||
            data == checkweather[5]
          ) {
            elefc1.classList.remove(
              "bg-gradient-to-r",
              "from-cyan-200",
              "to-blue-100",
              "from-orange-300",
              "to-orange-100"
            );
            elefc1.classList.add(
              "bg-gradient-to-r",
              "from-gray-400",
              "to-gray-100"
            );
          }else if (data == checkweather[2] || data == checkweather[6]) {
            elefc1.classList.remove(
              "bg-gradient-to-r",
              "from-gray-400",
              "to-gray-100",
              "from-orange-300",
              "to-orange-100"
            );
            elefc1.classList.add(
              "bg-gradient-to-r",
              "from-cyan-200",
              "to-blue-100"
            );
          }
        });
        TextForecast_2_match.forEach((data) => {
          

          if (data == checkweather[0]) {
            elefc2.classList.remove(
              "bg-gradient-to-r",
              "from-cyan-200",
              "to-blue-100",
              "from-gray-400",
              "to-gray-100"
            );
            elefc2.classList.add(
              "bg-gradient-to-r",
              "from-orange-300",
              "to-orange-100"
            );
          } else if (
            data == checkweather[1] ||
            data == checkweather[3] ||
            data == checkweather[5]
          ) {
            elefc2.classList.remove(
              "bg-gradient-to-r",
              "from-cyan-200",
              "to-blue-100",
              "from-orange-300",
              "to-orange-100"
            );
            elefc2.classList.add(
              "bg-gradient-to-r",
              "from-gray-400",
              "to-gray-100"
            );
          }else if (data == checkweather[2] || data == checkweather[6]) {
            elefc2.classList.remove(
              "bg-gradient-to-r",
              "from-gray-400",
              "to-gray-100",
              "from-orange-300",
              "to-orange-100"
            );
            elefc2.classList.add(
              "bg-gradient-to-r",
              "from-cyan-200",
              "to-blue-100"
            );
          }
        });
      };
      ForecastTime();
      ForecastTemp();
      ForecastImg();
      ForecastBg();
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
      .catch((err) => console.error(err));
    setTimeout(() => {
      DisplayWeather.classList.remove("opacity-0");
      // footer.classList.remove("hidden");
    }, 1000);
  }, 2000);
}

Info.addEventListener("input", WeatherAPI);

/*สภาพอากาศ 1
อุณหภูมิ 2
location 3
โอกาสที่ฝนจะตก 4
วันเวลา 4
ความชื้น 4*/
