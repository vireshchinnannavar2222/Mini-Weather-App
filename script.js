// OpenWeather API configuration
const API_KEY = 'af7d1d6d43504cd07a6783bdd88a06d5';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const errorDiv = document.getElementById('error');

// Weather data elements
const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Event listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

// Fetch weather data from API
async function getWeatherData(city) {
    try {
        showLoading();
        
        const response = await fetch(
            `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeatherData(data);
        
    } catch (error) {
        showError(error.message);
    }
}

// Display weather data
function displayWeatherData(data) {
    // Hide error and show weather info
    errorDiv.classList.add('hidden');
    weatherInfo.classList.remove('hidden');
    
    // Update weather information
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    
    // Set weather icon
    weatherIcon.textContent = getWeatherEmoji(data.weather[0].main);
}

// Get weather emoji based on condition
function getWeatherEmoji(condition) {
    const weatherEmojis = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '🌫️',
        'Haze': '🌫️',
        'Dust': '🌫️',
        'Fog': '🌫️',
        'Sand': '🌫️',
        'Ash': '🌫️',
        'Squall': '💨',
        'Tornado': '🌪️'
    };
    
    return weatherEmojis[condition] || '🌡️';
}

// Show loading state
function showLoading() {
    weatherInfo.classList.add('hidden');
    errorDiv.classList.add('hidden');
}

// Show error message
function showError(message) {
    weatherInfo.classList.add('hidden');
    errorDiv.classList.remove('hidden');
    errorDiv.textContent = `Error: ${message}. Please try again.`;
}

// Load default city on page load (optional)
window.addEventListener('load', () => {
    // Uncomment to load a default city
    // getWeatherData('London');
});
