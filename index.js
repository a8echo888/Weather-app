
var city = "Buenos aires"; // field for enter text
const APIkey = "f4c0e3fbf39c6a81655f059b65b562f3";

var displayedcity = document.getElementById("ciudad");

var Currenttemp = document.getElementById("currentTemp");
var Todaydesc = document.getElementById("description");
var Todaymax = document.getElementById("max");
var TodayMin = document.getElementById("min");

var Day0max = document.getElementById("0max");
var Day0Min = document.getElementById("0min");
var Day0desc = document.getElementById("desc0");
var Day1max = document.getElementById("1max");
var Day1Min = document.getElementById("1min");
var Day1desc = document.getElementById("desc1");
var Day2max = document.getElementById("2max");
var Day2Min = document.getElementById("2min");
var Day2desc = document.getElementById("desc2");
var Day3max = document.getElementById("3max");
var Day3Min = document.getElementById("3min");
var Day3desc = document.getElementById("desc3");
var Day4max = document.getElementById("4max");
var Day4Min = document.getElementById("4min");
var Day4desc = document.getElementById("desc4");
var Day5max = document.getElementById("5max");
var Day5Min = document.getElementById("5min");
var Day5desc = document.getElementById("desc5");

//----------------------------------------------------------------------------------------------
let todayimage = document.getElementById("icon0");
let image1 = document.getElementById("icon1");
let image2 = document.getElementById("icon2");
let image3 = document.getElementById("icon3");
let image4 = document.getElementById("icon4");
let image5 = document.getElementById("icon5");
let image6 = document.getElementById("icon6");
//----------------------------------------------------------------------------------------------
var min;
var max;
var lon;
var lat;

const today = new Date();
var currentday = document.getElementById("today");
var day1 = document.getElementById("weekday0");
var day2 = document.getElementById("weekday1");
var day3 = document.getElementById("weekday2");
var day4 = document.getElementById("weekday3");
var day5 = document.getElementById("weekday4");
var day6 = document.getElementById("weekday5");


const getCurrentCityWeather = async (city) => {

    console.log(city);
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=sp&appid=${APIkey}`;

    const response = await fetch(api);
    const data = await response.json();

    console.log(data);

    lon = data.coord.lon;
    lat = data.coord.lat;
    Forecast7days();

    displayedcity.innerHTML = data.name;
    Currenttemp.innerHTML = Math.round(data.main.temp);

    Todaydesc.innerHTML = data.weather[0].description;
    Todaymax.innerHTML = Math.round(data.main.temp_max);
    TodayMin.innerHTML = Math.round(data.main.temp_min);

    const currenthour = today.getHours()

    switch (data.weather[0].main) {
        case 'Clear' && currenthour > 7 && currenthour < 19:
            todayimage.src = 'icons/clear-day.svg'
            break;
        case 'Clear':
            todayimage.src = 'icons/clear-night.svg'
            break;
        case 'Clouds':
            todayimage.src = 'icons/cloudy.svg'
            break;
        case 'Mist' || 'Smoke' || 'Haze' || 'Dust' || 'Fog' || 'Sand' || 'Ash' || 'Squall' || 'Tornado':
            todayimage.src = 'icons/mist.svg'
            break;
        case 'Rain' || 'Drizzle':
            todayimage.src = 'icons/rain.svg'
            break;
        case 'Snow':
            todayimage.src = 'icons/snow.svg'
            break;
        case 'Thunderstorm':
            todayimage.src = 'icons/thunderstorms.svg'
            break;
    }

};


const Forecast7days = async () => {

    const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=es&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`;

    const response = await fetch(api);
    const data = await response.json();

    console.log(data);

    Day0Min.innerHTML = Math.round(data.daily[1].temp.min);
    Day0max.innerHTML = Math.round(data.daily[1].temp.max);
    Day0desc.innerHTML = data.daily[1].weather[0].description;
    Changeicon(0, data);

    Day1Min.innerHTML = Math.round(data.daily[2].temp.min);
    Day1max.innerHTML = Math.round(data.daily[2].temp.max);
    Day1desc.innerHTML = data.daily[2].weather[0].description;
    Changeicon(1, data);

    Day2Min.innerHTML = Math.round(data.daily[3].temp.min);
    Day2max.innerHTML = Math.round(data.daily[3].temp.max);
    Day2desc.innerHTML = data.daily[3].weather[0].description;
    Changeicon(2, data);

    Day3Min.innerHTML = Math.round(data.daily[4].temp.min);
    Day3max.innerHTML = Math.round(data.daily[4].temp.max);
    Day3desc.innerHTML = data.daily[4].weather[0].description;
    Changeicon(3, data);

    Day4Min.innerHTML = Math.round(data.daily[5].temp.min);
    Day4max.innerHTML = Math.round(data.daily[5].temp.max);
    Day4desc.innerHTML = data.daily[5].weather[0].description;
    Changeicon(4, data);

    Day5Min.innerHTML = Math.round(data.daily[6].temp.min);
    Day5max.innerHTML = Math.round(data.daily[6].temp.max);
    Day5desc.innerHTML = data.daily[6].weather[0].description;
    Changeicon(5, data);

}

const dayNames = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
];



getCurrentCityWeather(city);


currentday.innerHTML = dayNames[(today.getDay())];
day1.innerHTML = dayNames[(today.getDay() + 1)];
day2.innerHTML = dayNames[(today.getDay()) + 2];
day3.innerHTML = dayNames[(today.getDay()) + 3];
day4.innerHTML = dayNames[(today.getDay()) + 4];
day5.innerHTML = dayNames[(today.getDay()) + 5];
day6.innerHTML = dayNames[(today.getDay()) - 1];




document.getElementById("searchInput").addEventListener("keydown", event => {
    if (event.key === 'Enter') {
        city = document.getElementById("searchInput").value;
        getCurrentCityWeather(city);
    }
});

const Searchcountry = (source) => {

    if(source!=null && source.keycode==13){
        
        city = source.value;
    }
    else{
        city = document.getElementById("searchInput").value;
    }

    getCurrentCityWeather(city);
}

const Changeicon = (day, data) => {

    var source;
    switch (data.daily[day+1].weather[0].main) {
        case 'Clear':
            source = 'icons/clear-day.svg'
            break;
        case 'Clouds':
            source = 'icons/cloudy.svg'
            break;
        case 'Mist' || 'Smoke' || 'Haze' || 'Dust' || 'Fog' || 'Sand' || 'Ash' || 'Squall' || 'Tornado':
            source = 'icons/mist.svg'
            break;
        case 'Rain' || 'Drizzle':
            source = 'icons/rain.svg'
            break;
        case 'Snow':
            source = 'icons/snow.svg'
            break;
        case 'Thunderstorm':
            source = 'icons/thunderstorms.svg'
            break;
    }

    switch (day) {
        case 0:
            image1.src=source;
            break;
        case 1:
            image2.src=source;
            break;
        case 2:
            image3.src=source;
            break;
        case 3:
            image4.src=source;
            break;
        case 4:
            image5.src=source;
            break;
        case 5:
            image6.src=source;
            break;
    }
}

