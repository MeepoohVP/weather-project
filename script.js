const Html = document.querySelector("html");
const logoBtn = document.querySelector(".ToggleDark");
const select = document.querySelectorAll(".selection");



// System Mode
{
  // if (matchMedia) {
  //   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //     Html.classList.add("dark");
  //   } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  //     Html.classList.add("light");
  //   }
  // }
}
//ToggleDarkMode
{
  function ToggleDarkMode() {
    Html.classList.toggle("dark");
  }
  logoBtn.addEventListener("click", ToggleDarkMode);
}
