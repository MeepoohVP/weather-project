//ข้อมูลสถานที่

//Fetch API Translating
function ApiTranslating(){
    const beforeTranslating = '"' + document.querySelector("#info").value + '"' 
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

//Realtime Weather API
fetch('https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=en&api-version=3.0&profanityAction=NoAction&textType=plain', options)
.then(response => response.json())
.then(response => document.getElementById("demo").value = response[0].translations[0].text)
.catch(err => console.error("กรอกข้อมูลที่ถูกต้อง"));

setTimeout(() => {
    const option = {
    method: 'GET',
    headers: {
       'X-RapidAPI-Key': '42dc2f1aa5msh5bf1af0cc42368fp1f03c6jsn88c35a62d997',
       'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
    };
    const querydata = document.getElementById("demo").value
    fetch('https://weatherapi-com.p.rapidapi.com/astronomy.json?q=' + querydata, option)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error("กรอกข้อมูลที่ถูกต้อง"));
    
}, 2000)};