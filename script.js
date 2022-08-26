const Html = document.querySelector("html");
const logoBtn = document.querySelector(".ToggleDark");
const select = document.querySelectorAll(".selection");
const Realtime = document.querySelector("#realtime");
const Forecast_1 = document.querySelector("#Forecast-1-bg");
const Forecast_2 = document.querySelector("#Forecast-2-bg");
const selecRealtime = document.querySelector("#selec-realtime");
const selecForecast = document.querySelector("#selec-forecast");

// System Mode
{
  if (matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      Html.classList.add("dark");
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      Html.classList.add("light");
    }
  }
}
//ToggleDarkMode
{
  function ToggleDarkMode() {
    Html.classList.toggle("dark");
  }
  logoBtn.addEventListener("click", ToggleDarkMode);
}

function togglerealtime(){
  Realtime.classList.add('animate-spring');
  setTimeout(() => {
    Realtime.classList.remove('animate-spring');
  }, 2000);
}
selecRealtime.addEventListener('click',togglerealtime);

function toggleforecast(){
  Forecast_1.classList.add('animate-springfc-1');
  Forecast_2.classList.add('animate-springfc-2');
  setTimeout(() => {
    Forecast_1.classList.remove('animate-springfc-1');
    Forecast_2.classList.remove('animate-springfc-2');
  }, 2000);
}
selecForecast.addEventListener('click',toggleforecast)

