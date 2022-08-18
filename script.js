//ข้อมูลสถานที่
const Info = document.querySelector("#info");
const Translate = document.getElementById("Translate");
const Html = document.querySelector("html");
const logoBtn = document.querySelector(".ToggleDark");
const select = document.querySelectorAll('.selection');

if (matchMedia) {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    Html.classList.add("dark");
  } else if (
    window.matchMedia("(prefers-color-scheme: light)").matches) {
    Html.classList.add("light");
  }
}

//Fetch API Translating

function ApiTranslating() {
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
    console.log(data.current.condition.text);
    console.log(data.current.temp_c);
    console.log(data.location.name);
    console.log(data.location.country);
    console.log(data.location.localtime);
    console.log(data.forecast.forecastday[0].day.daily_chance_of_rain);
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
  }, 2000);
}

Info.addEventListener("input", ApiTranslating);

//ความชื้น  data.current.cloud
//สภาพอากาศ data.current.condition.text
//ความชื้น อุณหภูมิ เมฆ โอกาสที่ฝนจะตก location วันเวลา ชื่อ ประเทศ

//tailwind config
tailwind.config = {
  darkMode:'class',
  theme: {
    extend: {
      fontFamily: {
        Kanit: "Kanit",
      },
      colors: {
        SkyBlue: "#9BDCFF",
        Zinc: "#fafafa",
        NightSky: '#2E4482',
        OrangePastel:'#F7CC84',
        GrayPastel:'#e8e8e8'
      },dropShadow: {
        '3xl': '5px 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
    },
  },
};

//ToggleDarkMode


function ToggleDarkMode() {
  Html.classList.toggle("dark");
}

logoBtn.addEventListener('click',ToggleDarkMode);

