async function fetchWeatherData(place){
    const rawWeatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=96d166292d97494d98d134819241903&q=${place}`, {mode: 'cors'})
    const rawWeatherDataJson = await rawWeatherData.json()
    const parsedData = returnDataSet(rawWeatherDataJson)
    return parsedData
}

function returnDataSet(rawData){
    const city = rawData.location.name
    const coordinates = {'lat' :rawData.location.lat, 'lon': rawData.location.lon}
    const timezone = rawData.location.tz_id
    const localtime = rawData.location.localtime
    const text = rawData.current.condition.text
    const icon = rawData.current.condition.icon
    const pressure = rawData.current.pressure_mb
    const humidity = rawData.current.humidity
    const wind_kph = rawData.current.wind_kph
    console.log(city, coordinates, timezone, localtime, text, icon, pressure, humidity, wind_kph)
    return {city, coordinates, timezone, localtime, text, icon, pressure, humidity, wind_kph}
}


fetchWeatherData('Warsaw')