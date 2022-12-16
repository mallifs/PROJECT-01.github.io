 const api = {
    key:"f6feadd630a2476fc2fc47dcd6e6c826",
    base : "https://api.openweathermap.org/data/2.5/"
 }

 const searchBox = document.querySelector('.search-box');
 searchBox.addEventListener('keypress',setQuery);

 function setQuery(event) {
    if (event.keyCode == 13){
        getResults(searchBox.value);
        searchBox.value = ""
         
    }
 
    

 }

 function getResults (query) {
    fetch(`${api.base}weather?q=${query}&unit=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
 }

 function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.Location .City');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.Location .date');
    date.innerText = dateBuilder(now);


     let temp = document.querySelector('.Temp');
     temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F </span>`;


     let celsius = (weather.main.temp - 32) * (5 / 9);

     temp.addEventListener("click", () =>{
      temp.innerHTML = `${Math.floor(celsius)}<span>°C</span>`
      // console.log("Hi")
     })

     let weatherEl = document.querySelector('.current .weather');
     weatherEl.innerText = weather.weather[0].main;

     

     let hiLow = document.querySelector('.hi-low');
     hiLow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;

    
 }    


 function dateBuilder (d) {
    let months = ["January","February","March","April","May",
    "June","July","August","september",
    "October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
 }

 


  