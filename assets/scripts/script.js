

const API_KEY = "1c988a028b151b66a5d13cfbb058963e";

// Fetch weather data and update the UI
function searchCity(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found');
                return;
            }
            displayCurrentWeather(data);
            fetchForecast(data.coord.lat, data.coord.lon);
            storeCity(cityName);
        });
}

// Display current weather data
function displayCurrentWeather(data) {
    document.getElementById("current-location").textContent = `${data.name}`;
    document.getElementById("current-temp").textContent = `Temperature: ${data.main.temp}°F`;
    document.getElementById("current-description").textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById("current-humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("current-wind").textContent = `Wind: ${data.wind.speed} mph`;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}
function getLocationWeather(lat, lon) {
    fetchCurrentWeather(lat, lon);
    fetchForecast(lat, lon);
}

// Fetch forecast data
function fetchForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Keep this line to check the fetched data
            const groupedData = groupForecastData(data.list);
            displayForecast(groupedData);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}


// Group forecast data by date
function groupForecastData(data) {
    const groupedData = data.reduce((acc, item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});

    const fiveDayData = {};
    const dates = Object.keys(groupedData).slice(0, 5);

    dates.forEach(date => {
        fiveDayData[date] = groupedData[date];
    });

    return fiveDayData;
}


// Display the 5-day forecast
function displayForecast(data) {
    const dates = Object.keys(data).slice(0, 5);
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = '';

    dates.forEach((date, index) => {
        const dayData = data[date][0];
        const dayElement = document.createElement("div");
        dayElement.classList.add("forecast", "forecast-card");

        // Format the date
        const formattedDate = new Date(date);
        const dateString = `${formattedDate.toLocaleString('en-US', {weekday: 'long'})} ${formattedDate.toLocaleString('en-US', {month: 'long'})}, ${formattedDate.getDate() + 1}`;

        dayElement.innerHTML = `
            <p id="date${index}">${dateString}</p>
            <img id="icon${index}" src="https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png" alt="Weather icon" />
            <p id="temp${index}">Temperature: ${dayData.main.temp}°F</p>
            <p id="description${index}">Weather: ${dayData.weather[0].description}</p>
            <p id="humidity${index}">Humidity: ${dayData.main.humidity}%</p>
            <p id="wind${index}">Wind: ${dayData.wind.speed} mph</p>
        `;

        forecastContainer.appendChild(dayElement);
    });
}

// Store searched city in local storage
function storeCity(cityName) {
    const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    if (!storedCities.includes(cityName)) {
        storedCities.push(cityName);
        localStorage.setItem("cities", JSON.stringify(storedCities));
    }
}

// Add event listener for search button
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
    const cityName = document.getElementById("city-input").value;
    searchCity(cityName);
});

// Add event listener for search input
const cityInput = document.getElementById("city-input");
cityInput.addEventListener("input", (e) => {
    const inputText = e.target.value;
    displayMatchingCities(inputText);
});

cityInput.addEventListener("blur", () => {
    setTimeout(() => {
        const dropdown = document.querySelector(".city-dropdown");
        if (dropdown) dropdown.remove();
    }, 200);
});

cityInput.addEventListener("focus", () => {
    const inputText = cityInput.value;
    displayMatchingCities(inputText);
    const dropdown = document.querySelector(".city-dropdown");
    if (dropdown) dropdown.style.display = 'block';
});

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const cityName = document.getElementById("city-input").value;
        searchCity(cityName);
    }
});

function displayMatchingCities(inputText) {
    const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    const matchingCities = storedCities.filter(city => city.toLowerCase().startsWith(inputText.toLowerCase()));
    
    // Remove existing dropdown if present
    const existingDropdown = document.querySelector(".city-dropdown");
    if (existingDropdown) existingDropdown.remove();

    if (inputText === "" || matchingCities.length === 0) return;

    // Create dropdown container
    const dropdown = document.createElement("div");
    dropdown.classList.add("city-dropdown");

    // Create dropdown items
    matchingCities.forEach(city => {
        const cityOption = document.createElement("div");
        cityOption.classList.add("city-option");
        cityOption.textContent = city;
        cityOption.addEventListener("click", () => {
            cityInput.value = city;
            searchCity(city);
        });
        dropdown.appendChild(cityOption);
    });

    // Append dropdown container to search container
    
    const searchWrapper = document.querySelector(".search-wrapper");
    searchWrapper.appendChild(dropdown);
}

// Add event listener for popular city buttons
const cityButtons = document.querySelectorAll(".city-btn");
cityButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cityName = btn.textContent;
    searchCity(cityName);
    storeCity(cityName);
  });
});


// Get the user's location and display the local weather on page load
navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            fetchForecast(data.coord.lat, data.coord.lon);
        });
}, (error) => {
    console.error('Geolocation error:', error);
    // Fallback to a default city if geolocation fails
    searchCity('New York');
});

