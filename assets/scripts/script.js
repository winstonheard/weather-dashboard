// // API key for OpenWeatherMap
// const apiKey = "1c988a028b151b66a5d13cfbb058963e";

// // Get elements from the DOM
// const searchBtn = document.getElementById("searchBtn");
// const cityInput = document.getElementById("cityInput");
// const currentCityEl = document.getElementById("currentCity");
// const currentWeatherEl = document.getElementById("currentWeather");
// const forecastContainer = document.getElementById("forecastContainer");

// // Add event listener for the search button
// searchBtn.addEventListener("click", () => {
//     const cityName = cityInput.value;
//     if (!cityName) return;
//     getWeatherDataByName(cityName);
// });

// // Get the user's location when the dashboard first loads
// getLocation();

// // Get location using browser's Geolocation API
// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             const lat = position.coords.latitude;
//             const lon = position.coords.longitude;
//             getWeatherDataByCoords(lat, lon);
//         }, error => {
//             console.error("Error fetching location:", error);
//         });
//     } else {
//         console.error("Geolocation is not supported by this browser.");
//     }
// }

// // Get weather data by city name
// function getWeatherDataByName(cityName) {
//     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
//     fetchWeatherData(weatherUrl, forecastUrl);
// }

// // Get weather data by coordinates (latitude and longitude)
// function getWeatherDataByCoords(lat, lon) {
//     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
//     fetchWeatherData(weatherUrl, forecastUrl);
// }

// // Fetch weather and forecast data from API
// function fetchWeatherData(weatherUrl, forecastUrl) {
//     Promise.all([fetch(weatherUrl), fetch(forecastUrl)])
//         .then(([weatherResponse, forecastResponse]) => Promise.all([weatherResponse.json(), forecastResponse.json()]))
//         .then(([weatherData, forecastData]) => {
//             displayCurrentWeather(weatherData);
//             displayForecast(forecastData);
//         })
//         .catch(error => {
//             console.error("Error fetching weather data:", error);
//         });
// }


// // ...

// // Add event listener for the search button
// searchBtn.addEventListener("click", triggerSearch);

// // Add event listener for the Enter key on the search input
// cityInput.addEventListener("keyup", (event) => {
//     if (event.key === "Enter") {
//         triggerSearch();
//     }
// });

// // Add event listener for input on the search bar to display a dropdown list of saved cities
// cityInput.addEventListener("input", displayCityDropdown);

// // Create an element to display the dropdown list of saved cities
// const cityDropdown = document.createElement("div");
// cityDropdown.setAttribute("id", "cityDropdown");
// cityDropdown.classList.add("city-dropdown");
// cityInput.parentNode.style.position = "relative";
// cityInput.parentNode.insertBefore(cityDropdown, cityInput.nextSibling);

// // Display a dropdown list of saved cities based on the input text
// function displayCityDropdown() {
//     const inputText = cityInput.value.toLowerCase();
//     const matchedCities = searchedCities.filter(city => city.toLowerCase().startsWith(inputText));
//     cityDropdown.innerHTML = "";

//     if (matchedCities.length === 0 || inputText === "") {
//         cityDropdown.style.display = "none";
//         return;
//     }

//     matchedCities.forEach(city => {
//         const cityOption = document.createElement("div");
//         cityOption.textContent = city;
//         cityOption.classList.add("city-option");
//         cityOption.addEventListener("click", () => {
//             cityInput.value = city;
//             cityDropdown.style.display = "none";
//         });
//         cityDropdown.appendChild(cityOption);
//     });

//     cityDropdown.style.display = "block";
// }

// // Trigger search action
// function triggerSearch() {
//     const cityName = cityInput.value;
//     if (!cityName) return;
//     getWeatherDataByName(cityName);
//     saveSearchedCity(cityName);
// }

// // ...



// // Get the user's location when the dashboard first loads
// getLocation();

// // Load weather data for the last searched city if available
// const searchedCities = getSearchedCities();
// if (searchedCities.length > 0) {
//     getWeatherDataByName(searchedCities[searchedCities.length - 1]);
// }

// // Save searched city to localStorage
// function saveSearchedCity(cityName) {
//     const searchedCities = getSearchedCities();
//     if (!searchedCities.includes(cityName)) {
//         searchedCities.push(cityName);
//         localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
//     }
// }

// // Get searched cities from localStorage
// function getSearchedCities() {
//     const searchedCitiesJSON = localStorage.getItem("searchedCities");
//     return searchedCitiesJSON ? JSON.parse(searchedCitiesJSON) : [];
// }


// // Display current weather data on the dashboard
// function displayCurrentWeather(data) {
//     const temp = data.main.temp.toFixed(1);
//     const weather = data.weather[0].description;
//     const icon = data.weather[0].icon;

//     currentCityEl.textContent = `${data.name}, ${data.sys.country}`;
//     currentWeatherEl.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon"><br>
//         ${temp} °F<br>
//         ${weather}`;
// }

// // Group forecast data by date
// function groupForecastData(data) {
//     const groupedData = {};
//     data.list.forEach(item => {
//         const date = item.dt_txt.split(" ")[0];
//         if (!groupedData[date]) {
//             groupedData[date] = [];
//         }
//         groupedData[date].push(item);
//     });
//     return groupedData;
// }

// // Display 5-day forecast data on the dashboard
// function displayForecast(data) {
//     const dailyData = groupForecastData(data);
//     const dates = Object.keys(dailyData).slice(0, 5);
//     forecastContainer.innerHTML = "";

//     dates.forEach(date => {
//         const day = dailyData[date];
//         const middayForecast = day.find(item => item.dt_txt.includes("12:00:00")) || day[0];
//         const icon = middayForecast.weather[0].icon;
//         const temp = middayForecast.main.temp.toFixed(1);
//         const weather = middayForecast.weather[0].description;
//         const formattedDate = new Date(date).toDateString();

//         const forecastCard = document.createElement("div");
//         forecastCard.className = "forecast-card";
//         forecastCard.innerHTML = `<strong>${formattedDate}</strong><br>
//             <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon"><br>
//             ${temp} °F<br>
//             ${weather}`;
//         forecastContainer.appendChild(forecastCard);
//     });
// }

// // Initial call to get the user's location and display local weather
// getLocation();

// const API_KEY = "1c988a028b151b66a5d13cfbb058963e";
// const cityNameDisplay = document.getElementById("city-name");
// const temperatureDisplay = document.getElementById("temperature");
// const weatherDescriptionDisplay = document.getElementById("weather-description");
// const humidityDisplay = document.getElementById("humidity");
// const windDisplay = document.getElementById("wind");
// const iconDisplay = document.getElementById("weather-icon");
// const cityInput = document.getElementById("city-input");
// const searchBtn = document.getElementById("search-btn");
// const cityDropdown = document.createElement("div");
// const searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];

// cityDropdown.id = "city-dropdown";
// cityDropdown.classList.add("city-dropdown");
// cityInput.parentElement.appendChild(cityDropdown);

// // Add event listeners
// cityInput.addEventListener("input", (e) => {
//     const inputText = e.target.value;
//     displayMatchingCities(inputText);
// });
// cityInput.addEventListener("keydown", handleCityInputKeyDown);
// searchBtn.addEventListener("click", () => {
//     const cityName = document.getElementById("city-input").value;
//     searchCity(cityName);
// });

// // Handle input changes in the city search box
// function handleCityInput(event) {
//     const input = event.target.value;
//     const matchedCities = searchedCities.filter(city => city.toLowerCase().startsWith(input.toLowerCase()));

//     if (!input || !matchedCities.length) {
//         cityDropdown.style.display = "none";
//         return;
//     }

//     cityDropdown.innerHTML = "";
//     cityDropdown.style.display = "block";

//     matchedCities.forEach(city => {
//         const cityOption = document.createElement("div");
//         cityOption.textContent = city;
//         cityOption.classList.add("city-option");
//         cityOption.addEventListener("click", () => {
//             cityInput.value = city;
//             cityDropdown.style.display = "none";
//         });
//         cityDropdown.appendChild(cityOption);
//     });
// }

// // Handle 'Enter' key press in the city search box
// function handleCityInputKeyDown(event) {
//     if (event.key === "Enter") {
//         searchCityWeather();
//     }
// }

// // Search for the weather data of the specified city
// function searchCityWeather() {
//     const city = cityInput.value;
//     if (!city) return;

//     const savedCity = searchedCities.find(savedCity => savedCity.toLowerCase() === city.toLowerCase());
//     if (!savedCity) {
//         searchedCities.push(city);
//         localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
//     }

//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.cod !== 200) {
//                 alert("City not found. Please check the city name and try again.");
//                 return;
//             }

//             displayCurrentWeather(data);
//             return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}`);
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.cod !== "200") {
//                 alert("Error fetching weather forecast. Please try again later.");
//                 return;
//             }

//             displayForecast(data);
//         })
//         .catch(error => {
//             console.error("Error fetching weather data:", error);
//             alert("Error fetching weather data. Please try again later.");
//         });
// }

// // Display the current weather information
// function displayCurrentWeather(data) {
//     cityNameDisplay.textContent = data.name;
//     temperatureDisplay.textContent = `${convertKelvinToFahrenheit(data.main.temp)}°F`;
//     weatherDescriptionDisplay.textContent = data.weather[0].description;
//     humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
//     windDisplay.textContent = `Wind: ${data.wind.speed} mph`;
//     iconDisplay.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
// }

// // Display the 5-day weather forecast
// function displayForecast(data) {
//     const groupedData = groupForecastData(data);
//     const forecastContainer = document.getElementById("forecast-container");

//     forecastContainer.innerHTML = "";

//     groupedData.forEach((dayData, index) => {
//         const dayForecast = document.createElement("div");
//         dayForecast.classList.add("forecast");

//         const date = document.createElement("p");
//         date.id = `date${index}`;
//         date.textContent = new Date(dayData[0].dt_txt).toLocaleDateString();
//         dayForecast.appendChild(date);

//         const icon = document.createElement("img");
//         icon.id = `icon${index}`;
//         icon.src = `https://openweathermap.org/img/wn/${dayData[0].weather[0].icon}.png`;
//         icon.alt = "Weather icon";
//         dayForecast.appendChild(icon);

//         const temp = document.createElement("p");
//         temp.id = `temp${index}`;
//         const avgTemp = dayData.reduce((acc, cur) => acc + cur.main.temp, 0) / dayData.length;
//         temp.textContent = `${convertKelvinToFahrenheit(avgTemp)}°F`;
//         dayForecast.appendChild(temp);

//         const humidity = document.createElement("p");
//         humidity.id = `humidity${index}`;
//         const avgHumidity = dayData.reduce((acc, cur) => acc + cur.main.humidity, 0) / dayData.length;
//         humidity.textContent = `Humidity: ${Math.round(avgHumidity)}%`;
//         dayForecast.appendChild(humidity);

//         forecastContainer.appendChild(dayForecast);
//     });
// }

// // Group forecast data by date
// function groupForecastData(data) {
//     const groupedData = data.list.reduce((acc, cur) => {
//         const date = cur.dt_txt.split(" ")[0];
//         if (!acc[date]) {
//             acc[date] = [];
//         }
//         acc[date].push(cur);
//         return acc;
//     }, {});

//     return Object.values(groupedData).slice(0, 5);
// }

// // Convert Kelvin temperature to Fahrenheit
// function convertKelvinToFahrenheit(kelvin) {
//     return Math.round((kelvin - 273.15) * 9 / 5 + 32);
// }

// // Fetch and display weather data for the user's current location on page load
// navigator.geolocation.getCurrentPosition(position => {
//     const { latitude, longitude } = position.coords;
//     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.cod !== 200) {
//                 console.error("Error fetching weather data for current location:", data);
//                 return;
//             }

//             displayCurrentWeather(data);
//             return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}`);
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.cod !== "200") {
//                 console.error("Error fetching weather forecast for current location:", data);
//                 return;
//             }

//             displayForecast(data);
//         })
//         .catch(error => {
//             console.error("Error fetching weather data for current location:", error);
//         });
// });

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
            storeCity(cityName);
            fetchForecast(data.coord.lat, data.coord.lon);
        });
}

// Display current weather data
function displayCurrentWeather(data) {
    document.getElementById("city-name").textContent = `${data.name}`;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°F`;
    document.getElementById("weather-description").textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `Wind: ${data.wind.speed} mph`;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

// Fetch forecast data
function fetchForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            const groupedData = groupForecastData(data.list);
            displayForecast(groupedData);
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

    return groupedData;
}

// Display the 5-day forecast
function displayForecast(data) {
    const dates = Object.keys(data).slice(1, 6);
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = '';

    dates.forEach((date, index) => {
        const dayData = data[date][0];
        const dayElement = document.createElement("div");
        dayElement.classList.add("forecast");

        dayElement.innerHTML = `
            <p id="date${index}">${date}</p>
            <img id="icon${index}" src="https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png" alt="Weather icon" />
            <p id="temp${index}">Temperature: ${dayData.main.temp}°F</p>
            <p id="humidity${index}">Humidity: ${dayData.main.humidity}%</p>
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
    const searchContainer = document.getElementById("search-container");
    searchContainer.appendChild(dropdown);
}

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
});
