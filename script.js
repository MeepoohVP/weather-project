//ข้อมูลสถานที่
const Info = document.querySelector("#info");
const Translate = document.getElementById("Translate")
//Fetch API Translating
function ApiTranslating(){
    const beforeTranslating = `"${Info.value}"`
    const options = {
   method: 'POST',
   headers: {
       'content-type': 'application/json',
       'X-RapidAPI-Key': '42dc2f1aa5msh5bf1af0cc42368fp1f03c6jsn88c35a62d997',
       'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
   },
   body: '[{"Text":' + beforeTranslating + '}]' 
}

//Translating
fetch('https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=en&api-version=3.0&profanityAction=NoAction&textType=plain', options)
.then(response => response.json())
.then(data => Translate.value = data[0].translations[0].text)
.catch(err => console.error("กรอกข้อมูลที่ถูกต้อง"));

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
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a92bff38c9msh12825a0c18cfffbp1f5c67jsnf6a290d4fbf8',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    const querydata = Translate.value
    fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + querydata, option)
    .then(response => response.json())
    .then(data => dtweather(data))
    .catch(err => console.error("กรอกข้อมูลที่ถูกต้อง"));
    
}, 2000)

};


Info.addEventListener('input',ApiTranslating)


//ความชื้น  data.current.cloud
//สภาพอากาศ data.current.condition.text
//ความชื้น อุณหภูมิ เมฆ โอกาสที่ฝนจะตก location วันเวลา ชื่อ ประเทศ

//tailwind config
tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          'Kanit': "Kanit",
        },
        colors: {
          'SkyBlue': "#9BDCFF",
          'Zinc': "#fafafa"
        },
      },
    },
  };