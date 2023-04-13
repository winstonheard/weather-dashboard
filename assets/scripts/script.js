// API key for OpenWeatherMap
const apiKey = "1c988a028b151b66a5d13cfbb058963e";

// Get elements from the DOM
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const currentCityEl = document.getElementById("currentCity");
const currentWeatherEl = document.getElementById("currentWeather");
const forecastContainer = document.getElementById("forecastContainer");

// Add event listener for the search button
searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value;
    if (!cityName) return;
    getWeatherDataByName(cityName);
});

// Get the user's location when the dashboard first loads
getLocation();

// Get location using browser's Geolocation API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherDataByCoords(lat, lon);
        }, error => {
            console.error("Error fetching location:", error);
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

// Get weather data by city name
function getWeatherDataByName(cityName) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
    fetchWeatherData(weatherUrl, forecastUrl);
}

// Get weather data by coordinates (latitude and longitude)
function getWeatherDataByCoords(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetchWeatherData(weatherUrl, forecastUrl);
}

// Fetch weather and forecast data from API
function fetchWeatherData(weatherUrl, forecastUrl) {
    Promise.all([fetch(weatherUrl), fetch(forecastUrl)])
        .then(([weatherResponse, forecastResponse]) => Promise.all([weatherResponse.json(), forecastResponse.json()]))
        .then(([weatherData, forecastData]) => {
            displayCurrentWeather(weatherData);
            displayForecast(forecastData);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

// Display current weather data on the dashboard
function displayCurrentWeather(data) {
    const temp = data.main.temp.toFixed(1);
    const weather = data.weather[0].description;
    const icon = data.weather[0].icon;

    currentCityEl.textContent = `${data.name}, ${data.sys.country}`;
    currentWeatherEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon"><br>
        ${temp} °F<br>
        ${weather}`;
}

// Group forecast data by date
function groupForecastData(data) {
    const groupedData = {};
    data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if (!groupedData[date]) {
            groupedData[date] = [];
        }
        groupedData[date].push(item);
    });
    return groupedData;
}

// Display 5-day forecast data on the dashboard
function displayForecast(data) {
    const dailyData = groupForecastData(data);
    const dates = Object.keys(dailyData).slice(0, 5);
    forecastContainer.innerHTML = "";

    dates.forEach(date => {
        const day = dailyData[date];
        const middayForecast = day.find(item => item.dt_txt.includes("12:00:00")) || day[0];
        const icon = middayForecast.weather[0].icon;
        const temp = middayForecast.main.temp.toFixed(1);
        const weather = middayForecast.weather[0].description;
        const formattedDate = new Date(date).toDateString();

        const forecastCard = document.createElement("div");
        forecastCard.className = "forecast-card";
        forecastCard.innerHTML = `<strong>${formattedDate}</strong><br>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon"><br>
            ${temp} °F<br>
            ${weather}`;
        forecastContainer.appendChild(forecastCard);
    });
}

// Initial call to get the user's location and display local weather
getLocation();

