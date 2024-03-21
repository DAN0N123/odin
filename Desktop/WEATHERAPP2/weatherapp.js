
async function getWeatherData(place){
    try{
        const rawWeatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=96d166292d97494d98d134819241903&q=${place}`, {mode: 'cors'})
        const rawWeatherDataJson = await rawWeatherData.json()
        const parsedData = returnDataSet(rawWeatherDataJson)
        return parsedData
    }catch (error){
        console.log(`Error occured while fetching data: ${error}`)
    }
    
}

function darkMode(){
    const body = document.querySelector('body')
    body.style.cssText = "background-image: url('night-background.png');"
    const bigbox = document.querySelector('.bigbox')
    bigbox.style.color = 'white'
    const icons = document.querySelectorAll('svg');
    icons.forEach( (icon) => {
        icon.setAttribute('fill', 'white')
    })
    const searchBar = document.getElementById('searchBar')
    searchBar.style.cssText = 'border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border-bottom: 2px solid transparent;'
    const weatherBox = document.querySelector('.weatherBox')
    weatherBox.style.borderColor = 'white'
}

function lightMode(){
    const body = document.querySelector('body')
    body.style.cssText = "background-image: url('background.png');"
    const bigbox = document.querySelector('.bigbox')
    bigbox.style.color = 'black'
    const icons = document.querySelectorAll('svg');
    icons.forEach( (icon) => {
        icon.setAttribute('fill', 'black')
    })
    const searchBar = document.getElementById('searchBar')
    searchBar.style.cssText = 'border-bottom-left-radius: 0px; border-bottom-right-radius:0px; border-bottom: 2px solid black;'
    const weatherBox = document.querySelector('.weatherBox')
    weatherBox.style.borderColor = 'black'
}

function generateGlobe(lat, lng, is_day){
    let background = null;
    const gData = [...Array(1).keys()].map(() => ({
    lat: lat,
    lng: lng,
    size: 0.5,
    color: 'red'
    }));
    if(is_day === 1){
        background = ('background.png')
        lightMode()
    }else{
        background = ('night-background.png')
        darkMode()
    }
    Globe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
    .pointsData(gData)
    .backgroundImageUrl(background)
    .pointAltitude('size')
    .pointColor('color')
    (document.getElementById('globeViz'))   
}


const scene = document.querySelector('.scene-container')

function returnDataSet(rawData){
    const city = rawData.location.name
    const coordinates = {'lat' :rawData.location.lat, 'lon': rawData.location.lon}
    const timezone = rawData.location.tz_id
    const localtime = rawData.location.localtime
    const temperatureC = rawData.current.temp_c
    const temperatureF = rawData.current.temp_f
    const text = rawData.current.condition.text
    const icon = rawData.current.condition.icon
    const pressure = rawData.current.pressure_mb
    const humidity = rawData.current.humidity
    const wind_kph = rawData.current.wind_kph
    const is_day = rawData.current.is_day
    return {city, coordinates, timezone, localtime, text, icon, pressure, humidity, wind_kph, temperatureC, temperatureF, is_day}
}


async function displayWeatherData(place){
    const weatherData = await getWeatherData(place);
    generateGlobe(weatherData.coordinates.lat, weatherData.coordinates.lon, weatherData.is_day)
    const cityName = document.querySelector('.cityName p')
    cityName.textContent = weatherData.city
    const time = document.querySelector('.time p')
    time.textContent = `${weatherData.localtime} - ${weatherData.timezone}`
    const weatherIcon = document.querySelector('.weather img')
    weatherIcon.src = weatherData.icon
    const weatherText = document.querySelector('.currentWeather p')
    weatherText.textContent = weatherData.text
    const temperatureIcon = document.querySelector('.temperature .icon')
    if(weatherData.temperatureC > 25){
        temperatureIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-thermometer-high" viewBox="0 0 16 16">
        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585a1.5 1.5 0 0 1 1 1.415"/>
        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
      </svg>`
    }else if(weatherData.temperatureC > 8 && weatherData.temperatureC < 25){
        temperatureIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>
        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
      </svg>`
    }else{
        temperatureIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-thermometer-low" viewBox="0 0 16 16">
        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585a1.5 1.5 0 0 1 1 1.415"/>
        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
      </svg>`
    }
    const temperatureValue = document.querySelector('.temperature p')
    temperatureValue.textContent = `${weatherData.temperatureC}°C`
    temperatureValue.classList.add('C')
    temperatureValue.addEventListener('click', function(){
        if(this.classList.contains('C')){
            this.classList.remove('C')
            this.classList.add('F')
            this.textContent =  `${weatherData.temperatureF}°F`
        }else{
            this.classList.remove('F')
            this.classList.add('C')
            this.textContent = `${weatherData.temperatureC}°C`
        }
    })
    const wind = document.querySelector('.wind p')
    wind.textContent = `${weatherData.wind_kph} KPH`
    const humidity = document.querySelector('.humidity p')
    humidity.textContent = weatherData.humidity
    const pressure = document.querySelector('.pressure p')
    pressure.textContent = weatherData.pressure + ' hPa'
}
const form = document.querySelector('form')

form.addEventListener('submit', function(event){
    event.preventDefault()
    const searchBar = this.querySelector('input')
    const place = searchBar.value
    displayWeatherData(place)
    searchBar.value= ''
})

displayWeatherData('Los Angeles')