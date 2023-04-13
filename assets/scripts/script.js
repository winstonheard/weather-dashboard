const apiKey = "1c988a028b151b66a5d13cfbb058963e";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const currentCityEl = document.getElementById("currentCity");
const currentWeatherEl = document.getElementById("currentWeather");
const forecastContainer = document.getElementById("forecastContainer");

searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value;
    if (!cityName) return;
    getWeatherData(cityName);
});

function getWeatherData(cityName) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;

    Promise.all([fetch(weatherUrl), fetch(forecastUrl)])
        .then(([weatherResponse, forecastResponse]) => Promise.all([weatherResponse.json(),
