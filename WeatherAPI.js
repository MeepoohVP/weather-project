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
   { // console.log(data);
    // console.log(data.current.condition.text); //Weather
    // console.log(data.current.temp_c); //Temp
    // console.log(data.current.wind_kph);
    // console.log(data.location.name); //Location
    // console.log(data.location.country); //Location
    // console.log(data.location.localtime); //Time
    // console.log(data.forecast.forecastday[0].day.daily_chance_of_rain); //Rain
  }
    if (data.current.condition.text !== "Clear") {
      dpWeather.innerHTML = data.current.condition.text;
      dpTemp.innerHTML = data.current.temp_c + "&deg;";
      dpWind.innerHTML = data.current.wind_kph;
      dpImgWeather.src = data.current.condition.icon;
      dpMoisture.innerHTML = data.current.humidity;
      dpLocation.innerHTML = data.location.name;
      dpCountry.innerHTML = data.location.country;
      setInterval(()=>{
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const Today = date.getDate() + "/" + (date.getMonth() + 1);
        const time = date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        dpTime.innerHTML = time;
      },)
      dpTime.innerHTML = time;
      dpDate.innerHTML = Today;
      dpRain.innerHTML = data.forecast.forecastday[0].day.daily_chance_of_rain;
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
      DisplayWeather.classList.remove("hidden");
      footer.classList.remove("hidden");
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
